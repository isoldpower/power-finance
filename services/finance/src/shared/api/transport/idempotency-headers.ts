import { IDEMPOTENCY_HEADER } from "./config.ts";


const idempotencyHeaders = (idempotencyKey: string | undefined): Record<string, string> => {
	return idempotencyKey ? { [IDEMPOTENCY_HEADER]: idempotencyKey } : {};
};

export { idempotencyHeaders };
