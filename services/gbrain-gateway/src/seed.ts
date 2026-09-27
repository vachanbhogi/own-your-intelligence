import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTenantBrain, seedDecisionPage, type TenantBrain } from './brain.js';

export interface TenantSeedRecord {
  tenant_id: string;
  slug: string;
  display_name: string;
  status: string;
}

export interface TenantsSeedFixture {
  fixture_id: string;
  schema_version: string;
  tenants: TenantSeedRecord[];
}

export const TENANT_A = '33333333-3333-4333-8333-333333333333';
export const TENANT_B = '33333333-3333-4333-8333-333333333334';

const SEED_DECISIONS: Record<string, { title: string; body: string }> = {
  [TENANT_A]: {
    title: 'Always disclose simulated preview behavior',
    body:
      'Any preview or demo surface must clearly disclose when behavior is simulated, mocked, or non-production.',
  },
  [TENANT_B]: {
    title: 'Fixed export schema for reporting screens',
    body:
      'All reporting exports must use the tenant-approved fixed column schema rather than ad-hoc visible-column selection.',
  },
};

export function defaultSeedFixturePath(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, '../../../contracts/v1/fixtures/tenants.seed.json');
}

export function loadTenantsSeed(path = defaultSeedFixturePath()): TenantsSeedFixture {
  const raw = readFileSync(path, 'utf8');
  return JSON.parse(raw) as TenantsSeedFixture;
}

export function seedBrainsFromFixture(fixture: TenantsSeedFixture): Map<string, TenantBrain> {
  const brains = new Map<string, TenantBrain>();
  for (const tenant of fixture.tenants) {
    if (tenant.status !== 'ready') {
      continue;
    }
    const brain = createTenantBrain(tenant.tenant_id);
    const decision = SEED_DECISIONS[tenant.tenant_id] ?? {
      title: 'Always disclose simulated preview behavior',
      body: `Default seeded decision for ${tenant.slug}.`,
    };
    seedDecisionPage(brain, decision);
    brains.set(tenant.tenant_id, brain);
  }
  return brains;
}

export function seedDefaultBrains(): Map<string, TenantBrain> {
  return seedBrainsFromFixture(loadTenantsSeed());
}
