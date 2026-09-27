/**
 * In-process idempotency gate matching handoff 06 §2.
 */

export function createIdempotencyStore() {
  /** @type {Map<string, { hash: string, response: object }>} */
  const records = new Map();

  return {
    /**
     * @param {string} key
     * @param {string} requestHash
     * @param {() => object} acceptFn returns { status, body }
     */
    run(key, requestHash, acceptFn) {
      const existing = records.get(key);
      if (existing) {
        if (existing.hash !== requestHash) {
          return {
            status: 409,
            body: {
              code: "IDEMPOTENCY_CONFLICT",
              message: "Idempotency-Key reused with a different request body",
              request_id: crypto.randomUUID(),
              retryable: false,
            },
            conflict: true,
          };
        }
        return { ...existing.response, replay: true };
      }
      const response = acceptFn();
      records.set(key, { hash: requestHash, response });
      return response;
    },
    size() {
      return records.size;
    },
  };
}
