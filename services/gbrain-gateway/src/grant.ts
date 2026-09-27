import type { HarmonyGrant } from './types.js';

export const GRANT_HEADER = 'x-harmony-grant';

export class GrantError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly httpStatus: number,
    readonly retryable = false,
  ) {
    super(message);
  }
}

export function parseHarmonyGrant(raw: string | undefined): HarmonyGrant {
  if (!raw || raw.trim() === '') {
    throw new GrantError('AUTH_REQUIRED', 'Missing X-Harmony-Grant header.', 401);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new GrantError('AUTH_REQUIRED', 'X-Harmony-Grant must be JSON.', 401);
  }
  if (!parsed || typeof parsed !== 'object') {
    throw new GrantError('AUTH_REQUIRED', 'Invalid grant payload.', 401);
  }
  const grant = parsed as HarmonyGrant;
  if (grant.schema_version !== '1.0') {
    throw new GrantError('AUTH_REQUIRED', 'Unsupported grant schema_version.', 401);
  }
  if (!grant.tenant_id || typeof grant.tenant_id !== 'string') {
    throw new GrantError('AUTH_REQUIRED', 'Grant tenant_id is required.', 401);
  }
  if (!Array.isArray(grant.actions)) {
    throw new GrantError('AUTH_REQUIRED', 'Grant actions must be an array.', 401);
  }
  if (grant.revoked_at) {
    throw new GrantError('FORBIDDEN', 'Grant has been revoked.', 403);
  }
  if (grant.expires_at) {
    const exp = Date.parse(grant.expires_at);
    if (!Number.isNaN(exp) && exp <= Date.now()) {
      throw new GrantError('FORBIDDEN', 'Grant has expired.', 403);
    }
  }
  return grant;
}

export function assertTenantMatch(grant: HarmonyGrant, tenantId: string): void {
  if (grant.tenant_id !== tenantId) {
    throw new GrantError(
      'TENANT_MISMATCH',
      'Grant tenant does not match request tenant_id.',
      403,
    );
  }
}

export function grantAllowsReadSource(grant: HarmonyGrant, sourceId: string): boolean {
  if (grant.actions.includes('gbrain:read') || grant.actions.includes('read:*')) {
    return true;
  }
  const action = `read:${sourceId}`;
  if (grant.actions.includes(action)) {
    return true;
  }
  if (grant.read_sources?.includes(sourceId)) {
    return true;
  }
  if (sourceId.startsWith('feature-') && grant.actions.includes('read:feature')) {
    const suffix = sourceId.slice('feature-'.length);
    if (!grant.candidate_id || grant.candidate_id === suffix) {
      return true;
    }
  }
  return false;
}

export function assertReadSources(grant: HarmonyGrant, allowedSources: string[]): void {
  for (const sourceId of allowedSources) {
    if (!grantAllowsReadSource(grant, sourceId)) {
      throw new GrantError(
        'FORBIDDEN',
        `Grant does not permit read access to source ${sourceId}.`,
        403,
      );
    }
  }
}

export function assertFeatureWrite(grant: HarmonyGrant, tenantId: string, candidateId: string): void {
  assertTenantMatch(grant, tenantId);
  const hasWrite =
    grant.actions.includes('write:feature') ||
    grant.actions.includes('gbrain:write:feature');
  if (!hasWrite) {
    throw new GrantError('FORBIDDEN', 'Grant does not permit feature knowledge writes.', 403);
  }
  if (grant.candidate_id && grant.candidate_id !== candidateId) {
    throw new GrantError(
      'FORBIDDEN',
      'Grant candidate_id does not match requested feature source.',
      403,
    );
  }
}

export function assertPublish(grant: HarmonyGrant, tenantId: string): void {
  assertTenantMatch(grant, tenantId);
  const canPublish =
    grant.actions.includes('publish:company-published') ||
    grant.actions.includes('gbrain:publish') ||
    grant.actions.includes('publish:company');
  if (!canPublish) {
    throw new GrantError('FORBIDDEN', 'Grant does not permit company publication.', 403);
  }
}
