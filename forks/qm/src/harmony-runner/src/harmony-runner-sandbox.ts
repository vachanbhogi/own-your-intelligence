import type {
  Sandbox,
  SandboxHandle,
  SandboxInspectView,
  SandboxPrepareInput,
  SandboxProvisionRequest,
  SandboxRunResult,
} from "./sandbox-types.js";
import { RunnerSupervisorClient } from "./supervisor-client.js";

export interface HarmonyRunnerSandboxOptions {
  supervisorBaseUrl: string;
  client?: RunnerSupervisorClient;
}

/**
 * QM Sandbox adapter that delegates container lifecycle to the Harmony runner supervisor.
 * Maps provision/run/teardown to allocate/prepare/execute/destroy.
 */
export class HarmonyRunnerSandbox implements Sandbox {
  private readonly client: RunnerSupervisorClient;

  constructor(options: HarmonyRunnerSandboxOptions) {
    this.client =
      options.client ??
      new RunnerSupervisorClient({ baseUrl: options.supervisorBaseUrl });
  }

  async provision(request: SandboxProvisionRequest): Promise<SandboxHandle> {
    const res = await this.client.allocate({
      tenant_id: request.tenant_id,
      task_id: request.task_id,
      attempt_id: request.attempt_id,
      generation: request.generation,
      limits: request.limits,
    });
    return { handle_id: String(res.handle_id) };
  }

  async prepare(handle_id: string, input: SandboxPrepareInput): Promise<void> {
    await this.client.prepare({
      handle_id,
      input_manifest_id: input.input_manifest_id,
      artifact_refs: input.artifact_refs,
    });
  }

  async run(handle_id: string, task_type: string): Promise<SandboxRunResult> {
    const res = await this.client.execute({ handle_id, task_type });
    return {
      task_type: String(res.task_type ?? task_type),
      result_artifact_id: res.result_artifact_id
        ? String(res.result_artifact_id)
        : undefined,
    };
  }

  async inspect(handle_id: string): Promise<SandboxInspectView> {
    const res = await this.client.inspect(handle_id);
    return res as unknown as SandboxInspectView;
  }

  async stop(handle_id: string): Promise<void> {
    await this.client.stop(handle_id);
  }

  async destroy(handle_id: string): Promise<void> {
    await this.client.destroy(handle_id);
  }

  async heartbeat(handle_id: string): Promise<void> {
    await this.client.heartbeat(handle_id);
  }
}
