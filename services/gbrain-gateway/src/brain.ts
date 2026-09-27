import type { KnowledgePage, KnowledgeKind, KnowledgeStatus } from './types.js';
import { newPageId, sha256Hex } from './hash.js';

export interface SourceState {
  source_id: string;
  available: boolean;
  pages: KnowledgePage[];
}

export interface TenantBrain {
  tenant_id: string;
  knowledge_epoch: number;
  sources: Map<string, SourceState>;
  publicationLedger: PublicationLedgerEntry[];
}

export interface PublicationLedgerEntry {
  publication_id: string;
  page_id: string;
  revision: number;
  revision_hash: string;
  content_hash: string;
  knowledge_epoch: number;
  published_at: string;
}

const STANDARD_SOURCES = ['company-published', 'company-observations'] as const;

export function featureSourceId(candidateId: string): string {
  return `feature-${candidateId}`;
}

export function ensureStandardSources(brain: TenantBrain): void {
  for (const sourceId of STANDARD_SOURCES) {
    if (!brain.sources.has(sourceId)) {
      brain.sources.set(sourceId, {
        source_id: sourceId,
        available: true,
        pages: [],
      });
    }
  }
}

export function ensureFeatureSource(brain: TenantBrain, candidateId: string): SourceState {
  const sourceId = featureSourceId(candidateId);
  let source = brain.sources.get(sourceId);
  if (!source) {
    source = { source_id: sourceId, available: true, pages: [] };
    brain.sources.set(sourceId, source);
  }
  return source;
}

export function createTenantBrain(tenantId: string): TenantBrain {
  const brain: TenantBrain = {
    tenant_id: tenantId,
    knowledge_epoch: 1,
    sources: new Map(),
    publicationLedger: [],
  };
  ensureStandardSources(brain);
  return brain;
}

export function seedDecisionPage(
  brain: TenantBrain,
  input: { title: string; body: string; author?: string },
): KnowledgePage {
  const source = brain.sources.get('company-published');
  if (!source) {
    throw new Error('company-published source missing');
  }
  const page = buildPage({
    tenant_id: brain.tenant_id,
    source_id: 'company-published',
    kind: 'decision',
    status: 'approved',
    title: input.title,
    body: input.body,
    author: input.author ?? 'harmony-provisioning',
    revision: 1,
  });
  source.pages.push(page);
  return page;
}

function buildPage(input: {
  tenant_id: string;
  source_id: string;
  kind: KnowledgeKind;
  status: KnowledgeStatus;
  title: string;
  body: string;
  author: string;
  revision: number;
  page_id?: string;
}): KnowledgePage {
  const page_id = input.page_id ?? newPageId();
  const recorded_at = new Date().toISOString();
  const revision_hash = sha256Hex(
    JSON.stringify({
      page_id,
      source_id: input.source_id,
      revision: input.revision,
      title: input.title,
      body: input.body,
      kind: input.kind,
      status: input.status,
    }),
  );
  return {
    page_id,
    source_id: input.source_id,
    revision: input.revision,
    revision_hash,
    kind: input.kind,
    status: input.status,
    title: input.title,
    body: input.body,
    recorded_at,
    provenance: {
      tenant_id: input.tenant_id,
      author: input.author,
      recorded_at,
    },
  };
}

export function searchPages(source: SourceState, query: string): KnowledgePage[] {
  const q = query.trim().toLowerCase();
  if (q === '') {
    return [...source.pages];
  }
  return source.pages.filter(
    (p) =>
      p.status !== 'withdrawn' &&
      p.status !== 'rejected' &&
      (p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)),
  );
}

export function writeFeatureProposal(
  brain: TenantBrain,
  candidateId: string,
  input: { kind: KnowledgeKind; title: string; body: string; author: string },
): KnowledgePage {
  const source = ensureFeatureSource(brain, candidateId);
  const revision = source.pages.length + 1;
  const page = buildPage({
    tenant_id: brain.tenant_id,
    source_id: source.source_id,
    kind: input.kind,
    status: 'proposed',
    title: input.title,
    body: input.body,
    author: input.author,
    revision,
  });
  source.pages.push(page);
  return page;
}

export function publishCompanyDecision(
  brain: TenantBrain,
  input: {
    publication_id: string;
    kind: KnowledgeKind;
    title: string;
    body: string;
    author: string;
  },
): { page: KnowledgePage; receipt: PublicationLedgerEntry } {
  const source = brain.sources.get('company-published');
  if (!source) {
    throw new Error('company-published source missing');
  }
  const existing = brain.publicationLedger.find(
    (r) => r.publication_id === input.publication_id,
  );
  if (existing) {
    const page = source.pages.find((p) => p.page_id === existing.page_id);
    if (!page) {
      throw new Error('ledger page missing');
    }
    return { page, receipt: existing };
  }

  const revision = source.pages.length + 1;
  const page = buildPage({
    tenant_id: brain.tenant_id,
    source_id: 'company-published',
    kind: input.kind,
    status: 'approved',
    title: input.title,
    body: input.body,
    author: input.author,
    revision,
  });
  source.pages.push(page);
  brain.knowledge_epoch += 1;
  const content_hash = sha256Hex(`${page.title}\n${page.body}`);
  const receipt: PublicationLedgerEntry = {
    publication_id: input.publication_id,
    page_id: page.page_id,
    revision: page.revision,
    revision_hash: page.revision_hash,
    content_hash,
    knowledge_epoch: brain.knowledge_epoch,
    published_at: new Date().toISOString(),
  };
  brain.publicationLedger.push(receipt);
  return { page, receipt };
}

export function resolveSourcesForRead(
  brain: TenantBrain,
  allowedSources: string[],
  candidateId?: string | null,
): string[] {
  const resolved: string[] = [];
  for (const raw of allowedSources) {
    if (raw === 'feature' || raw === 'feature-local') {
      if (!candidateId) {
        throw new Error('candidate_id required for feature source reads');
      }
      resolved.push(featureSourceId(candidateId));
      continue;
    }
    if (raw.startsWith('feature-')) {
      resolved.push(raw);
      continue;
    }
    resolved.push(raw);
  }
  return resolved;
}
