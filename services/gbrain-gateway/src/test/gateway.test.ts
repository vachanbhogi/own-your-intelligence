import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { EventEmitter } from 'node:events';
import { Readable } from 'node:stream';
import { createGatewayApp } from '../app.js';
import { GRANT_HEADER } from '../grant.js';
import { TENANT_A, TENANT_B } from '../seed.js';
import type { HarmonyGrant } from '../types.js';

const CANDIDATE_A = '66666666-6666-4666-8666-666666666666';

function grantFor(
  tenantId: string,
  actions: string[],
  extra: Partial<HarmonyGrant> = {},
): string {
  const grant: HarmonyGrant = {
    schema_version: '1.0',
    tenant_id: tenantId,
    actions,
    ...extra,
  };
  return JSON.stringify(grant);
}

class MockResponse extends EventEmitter {
  statusCode = 200;
  headers: Record<string, string | number | string[]> = {};
  body = '';

  writeHead(status: number, headers: Record<string, string | number | string[]>): void {
    this.statusCode = status;
    this.headers = headers;
  }

  end(chunk?: string): void {
    if (chunk) {
      this.body += chunk;
    }
    this.emit('finish');
  }
}

async function post(
  app: ReturnType<typeof createGatewayApp>,
  path: string,
  body: unknown,
  grant?: string,
): Promise<{ status: number; json: unknown }> {
  const payload = JSON.stringify(body);
  const req = Readable.from([payload]) as IncomingMessage;
  req.method = 'POST';
  req.url = path;
  req.headers = {
    'content-type': 'application/json',
    ...(grant ? { [GRANT_HEADER]: grant } : {}),
  };

  const mockRes = new MockResponse();
  const res = mockRes as unknown as ServerResponse;
  const done = new Promise<void>((resolve) => mockRes.on('finish', resolve));

  app.handler(req, res);

  await done;
  return { status: mockRes.statusCode, json: JSON.parse(mockRes.body || '{}') };
}

describe('gbrain-gateway', () => {
  it('seeds distinct company-published decisions per tenant', async () => {
    const app = createGatewayApp();
    const grantA = grantFor(TENANT_A, ['read:company-published']);
    const grantB = grantFor(TENANT_B, ['read:company-published']);

    const resA = await post(app, '/read_context', {
      tenant_id: TENANT_A,
      query: 'preview',
      required: false,
      allowed_sources: ['company-published'],
    }, grantA);

    const resB = await post(app, '/read_context', {
      tenant_id: TENANT_B,
      query: 'export',
      required: false,
      allowed_sources: ['company-published'],
    }, grantB);

    assert.equal(resA.status, 200);
    assert.equal(resB.status, 200);
    const entriesA = (resA.json as { entries: { body: string }[] }).entries;
    const entriesB = (resB.json as { entries: { body: string }[] }).entries;
    assert.ok(entriesA.some((e) => e.body.includes('simulated')));
    assert.ok(entriesB.some((e) => e.body.includes('fixed column schema')));
    assert.ok(!entriesA.some((e) => e.body.includes('fixed column schema')));
    assert.ok(!entriesB.some((e) => e.body.includes('simulated preview')));
  });

  it('rejects cross-tenant grant/body mismatch', async () => {
    const app = createGatewayApp();
    const grantA = grantFor(TENANT_A, ['read:company-published']);
    const res = await post(app, '/read_context', {
      tenant_id: TENANT_B,
      query: 'export',
      required: false,
      allowed_sources: ['company-published'],
    }, grantA);

    assert.equal(res.status, 403);
    assert.equal((res.json as { code: string }).code, 'TENANT_MISMATCH');
  });

  it('never returns another tenant decision when scoped to one tenant', async () => {
    const app = createGatewayApp();
    const grantA = grantFor(TENANT_A, ['read:company-published']);
    const res = await post(app, '/read_context', {
      tenant_id: TENANT_A,
      query: 'export',
      required: false,
      allowed_sources: ['company-published'],
    }, grantA);

    assert.equal(res.status, 200);
    const entries = (res.json as { entries: { body: string; title: string }[] }).entries;
    assert.equal(entries.length, 0);
  });

  it('fail-closes required reads when company-published is unavailable', async () => {
    const app = createGatewayApp();
    const brain = app.store.brains.get(TENANT_A);
    assert.ok(brain);
    const source = brain.sources.get('company-published');
    assert.ok(source);
    source.available = false;

    const grant = grantFor(TENANT_A, ['read:company-published']);
    const required = await post(app, '/read_context', {
      tenant_id: TENANT_A,
      query: 'preview',
      required: true,
      allowed_sources: ['company-published'],
    }, grant);

    assert.equal(required.status, 503);
    assert.equal((required.json as { code: string }).code, 'CONTEXT_UNAVAILABLE');
    assert.equal((required.json as { retryable: boolean }).retryable, true);

    source.available = true;
    const optional = await post(app, '/read_context', {
      tenant_id: TENANT_A,
      query: 'preview',
      required: false,
      allowed_sources: ['company-published'],
    }, grant);

    assert.equal(optional.status, 200);
    assert.equal((optional.json as { unavailable: boolean }).unavailable, false);
  });

  it('allows feature propose with write grant and blocks without it', async () => {
    const app = createGatewayApp();
    const writeGrant = grantFor(TENANT_A, ['write:feature'], { candidate_id: CANDIDATE_A });
    const ok = await post(app, '/propose_knowledge', {
      tenant_id: TENANT_A,
      candidate_id: CANDIDATE_A,
      kind: 'requirement',
      title: 'Show disclosure banner',
      body: 'Preview route renders a simulated-data banner.',
    }, writeGrant);
    assert.equal(ok.status, 201);

    const readGrant = grantFor(TENANT_A, ['read:feature'], { candidate_id: CANDIDATE_A });
    const read = await post(app, '/read_context', {
      tenant_id: TENANT_A,
      query: 'banner',
      required: false,
      allowed_sources: ['feature'],
      candidate_id: CANDIDATE_A,
    }, readGrant);
    assert.equal(read.status, 200);
    assert.equal((read.json as { entries: unknown[] }).entries.length, 1);

    const denied = await post(app, '/propose_knowledge', {
      tenant_id: TENANT_A,
      candidate_id: CANDIDATE_A,
      kind: 'requirement',
      title: 'Blocked',
      body: 'Should not write',
    }, readGrant);
    assert.equal(denied.status, 403);
  });

  it('records publication receipt and increments knowledge epoch', async () => {
    const app = createGatewayApp();
    const brain = app.store.brains.get(TENANT_A);
    assert.ok(brain);
    const epochBefore = brain.knowledge_epoch;

    const publishGrant = grantFor(TENANT_A, ['publish:company-published']);
    const res = await post(app, '/publish_decision', {
      tenant_id: TENANT_A,
      publication_id: '99999999-9999-4999-8999-999999999999',
      kind: 'decision',
      title: 'Disclose preview simulations in UI copy',
      body: 'All preview surfaces must label simulated data in visible UI copy.',
    }, publishGrant);

    assert.equal(res.status, 201);
    const receipt = (res.json as { receipt: { knowledge_epoch: number; publication_id: string } })
      .receipt;
    assert.equal(receipt.publication_id, '99999999-9999-4999-8999-999999999999');
    assert.ok(receipt.knowledge_epoch > epochBefore);
    assert.equal(brain.publicationLedger.length, 1);

    const idempotent = await post(app, '/publish_decision', {
      tenant_id: TENANT_A,
      publication_id: '99999999-9999-4999-8999-999999999999',
      kind: 'decision',
      title: 'Disclose preview simulations in UI copy',
      body: 'All preview surfaces must label simulated data in visible UI copy.',
    }, publishGrant);
    assert.equal(idempotent.status, 201);
    assert.equal(brain.publicationLedger.length, 1);
  });
});
