export const GATEWAY_CONTRACT_VERSION = '1.0';

export type KnowledgeKind =
  | 'decision'
  | 'constraint'
  | 'observation'
  | 'requirement'
  | 'feature'
  | 'proposal';

export type KnowledgeStatus =
  | 'draft'
  | 'observed'
  | 'proposed'
  | 'approved'
  | 'rejected'
  | 'superseded'
  | 'withdrawn';

export interface KnowledgePage {
  page_id: string;
  source_id: string;
  revision: number;
  revision_hash: string;
  kind: KnowledgeKind;
  status: KnowledgeStatus;
  title: string;
  body: string;
  recorded_at: string;
  provenance: {
    tenant_id: string;
    author: string;
    recorded_at: string;
  };
}

export interface HarmonyGrant {
  schema_version: '1.0';
  tenant_id: string;
  actions: string[];
  /** Permitted read source ids (company-* and feature-<uuid>). */
  read_sources?: string[];
  /** Required for feature-local writes when using write:feature action. */
  candidate_id?: string | null;
  expires_at?: string;
  revoked_at?: string | null;
}

export interface ReadContextRequest {
  tenant_id: string;
  query: string;
  required: boolean;
  allowed_sources: string[];
  candidate_id?: string | null;
}

export interface ContextEntry {
  page_id: string;
  source_id: string;
  revision: number;
  revision_hash: string;
  kind: KnowledgeKind;
  status: KnowledgeStatus;
  title: string;
  body: string;
  trust_class: 'company-approved' | 'company-observed' | 'feature-local';
}

export interface ReadContextResponse {
  schema_version: typeof GATEWAY_CONTRACT_VERSION;
  tenant_id: string;
  entries: ContextEntry[];
  incomplete: boolean;
  stale: boolean;
  unavailable: boolean;
  knowledge_epoch: number;
}

export interface ProposeKnowledgeRequest {
  tenant_id: string;
  candidate_id: string;
  kind: KnowledgeKind;
  title: string;
  body: string;
}

export interface ProposeKnowledgeResponse {
  schema_version: typeof GATEWAY_CONTRACT_VERSION;
  tenant_id: string;
  source_id: string;
  page_id: string;
  revision: number;
  revision_hash: string;
}

export interface PublishDecisionRequest {
  tenant_id: string;
  publication_id: string;
  kind: KnowledgeKind;
  title: string;
  body: string;
  rationale?: string;
}

export interface PublicationReceipt {
  publication_id: string;
  tenant_id: string;
  source_id: 'company-published';
  page_id: string;
  revision: number;
  revision_hash: string;
  content_hash: string;
  knowledge_epoch: number;
  published_at: string;
}

export interface PublishDecisionResponse {
  schema_version: typeof GATEWAY_CONTRACT_VERSION;
  receipt: PublicationReceipt;
}

export interface ErrorResponse {
  code: string;
  message: string;
  request_id: string;
  retryable: boolean;
}
