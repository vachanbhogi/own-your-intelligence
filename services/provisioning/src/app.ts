import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import {
  TenantConflictError,
  TenantDirectory,
  TenantNotFoundError,
  type TenantDirectoryOptions,
} from "./store.js";
import type { CreateTenantBody } from "./types.js";

export interface ProvisioningApp {
  directory: TenantDirectory;
  handle: (req: IncomingMessage, res: ServerResponse) => void;
  listen: (port?: number, host?: string) => http.Server;
}

export interface CreateProvisioningAppOptions extends TenantDirectoryOptions {
  port?: number;
}

let sharedDirectory: TenantDirectory | null = null;

export function resetSharedDirectoryForTests(): void {
  sharedDirectory = null;
}

function getSharedDirectory(options?: TenantDirectoryOptions): TenantDirectory {
  if (!sharedDirectory) {
    sharedDirectory = new TenantDirectory(options);
  }
  return sharedDirectory;
}

export function createProvisioningApp(
  options: CreateProvisioningAppOptions = {},
): ProvisioningApp {
  const directory = new TenantDirectory(options);
  sharedDirectory = directory;

  const handle = (req: IncomingMessage, res: ServerResponse): void => {
    void routeRequest(req, res, directory);
  };

  return {
    directory,
    handle,
    listen(port = options.port ?? 7104, host = "127.0.0.1") {
      const server = http.createServer(handle);
      server.listen(port, host);
      return server;
    },
  };
}

export function getTenantBindings(
  tenantId: string,
  options?: TenantDirectoryOptions,
): ReturnType<TenantDirectory["getBindings"]> {
  return getSharedDirectory(options).getBindings(tenantId);
}

async function routeRequest(
  req: IncomingMessage,
  res: ServerResponse,
  directory: TenantDirectory,
): Promise<void> {
  const requestId = req.headers["x-request-id"]?.toString() ?? randomUUID();
  res.setHeader("X-Request-ID", requestId);

  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    const segments = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);

    if (req.method === "GET" && segments.length === 3 && segments[0] === "tenants" && segments[2] === "bindings") {
      const tenantId = segments[1]!;
      const tenant = directory.getTenant(tenantId);
      if (!tenant) {
        sendJson(res, 404, errorBody("TENANT_NOT_FOUND", "Tenant not found", requestId, false));
        return;
      }
      sendJson(res, 200, {
        tenant_id: tenant.tenant_id,
        status: tenant.status,
        allow_new_execution: tenant.allow_new_execution,
        bindings: tenant.bindings,
      });
      return;
    }

    if (req.method === "POST" && segments.length === 1 && segments[0] === "tenants") {
      const body = (await readJson(req)) as CreateTenantBody;
      if (!body?.tenant_id || !body.slug || !body.display_name) {
        sendJson(res, 422, errorBody("VALIDATION_ERROR", "tenant_id, slug, and display_name are required", requestId, false));
        return;
      }
      const { operation } = directory.createTenantIdempotent(body);
      sendJson(res, 202, operation);
      return;
    }

    if (req.method === "POST" && segments.length === 3 && segments[0] === "tenants" && segments[2] === "provision") {
      const tenantId = segments[1]!;
      const { operation } = directory.provisionTenant(tenantId);
      sendJson(res, 202, operation);
      return;
    }

    if (req.method === "POST" && segments.length === 3 && segments[0] === "tenants" && segments[2] === "degrade") {
      const tenantId = segments[1]!;
      const tenant = directory.degradeTenant(tenantId);
      sendJson(res, 200, {
        tenant_id: tenant.tenant_id,
        status: tenant.status,
        allow_new_execution: tenant.allow_new_execution,
      });
      return;
    }

    sendJson(res, 404, errorBody("NOT_FOUND", "Route not found", requestId, false));
  } catch (err) {
    if (err instanceof TenantNotFoundError) {
      sendJson(res, 404, errorBody(err.code, err.message, requestId, false));
      return;
    }
    if (err instanceof TenantConflictError) {
      sendJson(res, 409, errorBody(err.code, err.message, requestId, false));
      return;
    }
    sendJson(res, 500, errorBody("INTERNAL_ERROR", "Unexpected error", requestId, true));
  }
}

function errorBody(
  code: string,
  message: string,
  requestId: string,
  retryable: boolean,
): Record<string, unknown> {
  return { code, message, request_id: requestId, retryable };
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(payload);
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}
