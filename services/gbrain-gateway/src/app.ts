import type { IncomingMessage, ServerResponse } from 'node:http';
import { createServer, type Server } from 'node:http';
import {
  assertFeatureWrite,
  assertPublish,
  assertReadSources,
  assertTenantMatch,
  GrantError,
  GRANT_HEADER,
  parseHarmonyGrant,
} from './grant.js';
import {
  publishCompanyDecision,
  resolveSourcesForRead,
  searchPages,
  writeFeatureProposal,
  type TenantBrain,
} from './brain.js';
import { newRequestId } from './hash.js';
import { seedDefaultBrains } from './seed.js';
import type {
  ErrorResponse,
  ProposeKnowledgeRequest,
  PublishDecisionRequest,
  ReadContextRequest,
  ReadContextResponse,
  ContextEntry,
} from './types.js';
import { GATEWAY_CONTRACT_VERSION } from './types.js';

export interface GatewayStore {
  brains: Map<string, TenantBrain>;
}

export interface CreateGatewayAppOptions {
  brains?: Map<string, TenantBrain>;
  seed?: boolean;
}

export interface GatewayApp {
  store: GatewayStore;
  handler: (req: IncomingMessage, res: ServerResponse) => void;
  listen: (port?: number, host?: string) => Promise<Server>;
}

function trustClassForSource(sourceId: string): ContextEntry['trust_class'] {
  if (sourceId === 'company-published') {
    return 'company-approved';
  }
  if (sourceId === 'company-observations') {
    return 'company-observed';
  }
  return 'feature-local';
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

function sendError(res: ServerResponse, requestId: string, err: GrantError): void {
  const body: ErrorResponse = {
    code: err.code,
    message: err.message,
    request_id: requestId,
    retryable: err.retryable,
  };
  sendJson(res, err.httpStatus, body);
}

async function readJsonBody<T>(req: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  if (!text.trim()) {
    throw new GrantError('CONTRACT_INVALID', 'Request body is required.', 422);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new GrantError('CONTRACT_INVALID', 'Request body must be valid JSON.', 422);
  }
}

function getRequestId(req: IncomingMessage): string {
  const header = req.headers['x-request-id'];
  if (typeof header === 'string' && header.length > 0) {
    return header;
  }
  return newRequestId();
}

function validateReadContext(body: ReadContextRequest): void {
  if (!body.tenant_id || typeof body.tenant_id !== 'string') {
    throw new GrantError('CONTRACT_INVALID', 'tenant_id is required.', 422);
  }
  if (typeof body.query !== 'string') {
    throw new GrantError('CONTRACT_INVALID', 'query is required.', 422);
  }
  if (typeof body.required !== 'boolean') {
    throw new GrantError('CONTRACT_INVALID', 'required must be boolean.', 422);
  }
  if (!Array.isArray(body.allowed_sources)) {
    throw new GrantError('CONTRACT_INVALID', 'allowed_sources must be an array.', 422);
  }
}

function handleReadContext(
  store: GatewayStore,
  grantHeader: string | undefined,
  body: ReadContextRequest,
  requestId: string,
): ReadContextResponse | GrantError {
  validateReadContext(body);
  let grant;
  try {
    grant = parseHarmonyGrant(grantHeader);
    assertTenantMatch(grant, body.tenant_id);
    assertReadSources(grant, body.allowed_sources);
  } catch (err) {
    return err as GrantError;
  }

  const brain = store.brains.get(body.tenant_id);
  if (!brain) {
    if (body.required) {
      return new GrantError(
        'CONTEXT_UNAVAILABLE',
        'Required company context could not be retrieved.',
        503,
        true,
      );
    }
    return {
      schema_version: GATEWAY_CONTRACT_VERSION,
      tenant_id: body.tenant_id,
      entries: [],
      incomplete: true,
      stale: false,
      unavailable: true,
      knowledge_epoch: 0,
    };
  }

  let sourceIds: string[];
  try {
    sourceIds = resolveSourcesForRead(brain, body.allowed_sources, body.candidate_id);
  } catch {
    return new GrantError('CONTRACT_INVALID', 'Invalid feature source request.', 422);
  }

  const entries: ContextEntry[] = [];
  let unavailable = false;
  let incomplete = false;

  for (const sourceId of sourceIds) {
    const source = brain.sources.get(sourceId);
    if (!source || !source.available) {
      unavailable = true;
      if (body.required) {
        return new GrantError(
          'CONTEXT_UNAVAILABLE',
          'Required company context could not be retrieved.',
          503,
          true,
        );
      }
      incomplete = true;
      continue;
    }
    const matches = searchPages(source, body.query);
    for (const page of matches) {
      entries.push({
        page_id: page.page_id,
        source_id: page.source_id,
        revision: page.revision,
        revision_hash: page.revision_hash,
        kind: page.kind,
        status: page.status,
        title: page.title,
        body: page.body,
        trust_class: trustClassForSource(page.source_id),
      });
    }
  }

  return {
    schema_version: GATEWAY_CONTRACT_VERSION,
    tenant_id: body.tenant_id,
    entries,
    incomplete,
    stale: false,
    unavailable,
    knowledge_epoch: brain.knowledge_epoch,
  };
}

export function createGatewayApp(options: CreateGatewayAppOptions = {}): GatewayApp {
  const store: GatewayStore = {
    brains:
      options.brains ??
      (options.seed === false ? new Map<string, TenantBrain>() : seedDefaultBrains()),
  };

  const handler = (req: IncomingMessage, res: ServerResponse): void => {
    void (async () => {
      const requestId = getRequestId(req);
      try {
        if (req.method === 'GET' && req.url === '/health') {
          sendJson(res, 200, { status: 'ok', service: 'gbrain-gateway' });
          return;
        }

        if (req.method !== 'POST' || !req.url) {
          sendError(
            res,
            requestId,
            new GrantError('CONTRACT_INVALID', 'Route not found.', 404),
          );
          return;
        }

        const grantHeader = req.headers[GRANT_HEADER] as string | undefined;

        if (req.url === '/read_context') {
          const body = await readJsonBody<ReadContextRequest>(req);
          const result = handleReadContext(store, grantHeader, body, requestId);
          if (result instanceof GrantError) {
            sendError(res, requestId, result);
            return;
          }
          sendJson(res, 200, result);
          return;
        }

        if (req.url === '/propose_knowledge') {
          const body = await readJsonBody<ProposeKnowledgeRequest>(req);
          const grant = parseHarmonyGrant(grantHeader);
          assertFeatureWrite(grant, body.tenant_id, body.candidate_id);
          const brain = store.brains.get(body.tenant_id);
          if (!brain) {
            sendError(
              res,
              requestId,
              new GrantError('TENANT_MISMATCH', 'Unknown tenant brain.', 403),
            );
            return;
          }
          const page = writeFeatureProposal(brain, body.candidate_id, {
            kind: body.kind,
            title: body.title,
            body: body.body,
            author: grant.tenant_id,
          });
          sendJson(res, 201, {
            schema_version: GATEWAY_CONTRACT_VERSION,
            tenant_id: body.tenant_id,
            source_id: page.source_id,
            page_id: page.page_id,
            revision: page.revision,
            revision_hash: page.revision_hash,
          });
          return;
        }

        if (req.url === '/publish_decision') {
          const body = await readJsonBody<PublishDecisionRequest>(req);
          const grant = parseHarmonyGrant(grantHeader);
          assertPublish(grant, body.tenant_id);
          const brain = store.brains.get(body.tenant_id);
          if (!brain) {
            sendError(
              res,
              requestId,
              new GrantError('TENANT_MISMATCH', 'Unknown tenant brain.', 403),
            );
            return;
          }
          const { page, receipt } = publishCompanyDecision(brain, {
            publication_id: body.publication_id,
            kind: body.kind,
            title: body.title,
            body: body.body,
            author: 'publication-service',
          });
          sendJson(res, 201, {
            schema_version: GATEWAY_CONTRACT_VERSION,
            receipt: {
              publication_id: receipt.publication_id,
              tenant_id: body.tenant_id,
              source_id: 'company-published' as const,
              page_id: page.page_id,
              revision: page.revision,
              revision_hash: page.revision_hash,
              content_hash: receipt.content_hash,
              knowledge_epoch: receipt.knowledge_epoch,
              published_at: receipt.published_at,
            },
          });
          return;
        }

        sendError(
          res,
          requestId,
          new GrantError('CONTRACT_INVALID', 'Route not found.', 404),
        );
      } catch (err) {
        if (err instanceof GrantError) {
          sendError(res, requestId, err);
          return;
        }
        sendError(
          res,
          requestId,
          new GrantError('UPSTREAM_UNKNOWN', 'Unexpected gateway error.', 500),
        );
      }
    })();
  };

  return {
    store,
    handler,
    listen(port = 7103, host = '127.0.0.1') {
      return new Promise((resolve, reject) => {
        const server = createServer(handler);
        server.once('error', reject);
        server.listen(port, host, () => resolve(server));
      });
    },
  };
}
