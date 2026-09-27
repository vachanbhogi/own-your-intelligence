export interface SupervisorClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export class RunnerSupervisorClient {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: SupervisorClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async allocate(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.post("/allocate", body);
  }

  async prepare(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.post("/prepare", body);
  }

  async execute(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.post("/execute", body);
  }

  async inspect(handle_id: string): Promise<Record<string, unknown>> {
    const res = await this.fetchImpl(`${this.baseUrl}/inspect/${encodeURIComponent(handle_id)}`);
    return this.parse(res);
  }

  async stop(handle_id: string): Promise<Record<string, unknown>> {
    return this.post(`/stop/${encodeURIComponent(handle_id)}`, {});
  }

  async destroy(handle_id: string): Promise<Record<string, unknown>> {
    return this.post(`/destroy/${encodeURIComponent(handle_id)}`, {});
  }

  async heartbeat(handle_id: string): Promise<Record<string, unknown>> {
    return this.post(`/heartbeat/${encodeURIComponent(handle_id)}`, {});
  }

  private async post(path: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    const res = await this.fetchImpl(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return this.parse(res);
  }

  private async parse(res: Response): Promise<Record<string, unknown>> {
    const data = (await res.json()) as Record<string, unknown>;
    if (!res.ok) {
      const code = String(data.code ?? "SUPERVISOR_ERROR");
      const message = String(data.message ?? res.statusText);
      throw new SupervisorError(code, message, res.status);
    }
    return data;
  }
}

export class SupervisorError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}
