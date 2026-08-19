import { IDEMPOTENCY_HEADER } from "./config.ts";


function idempotencyHeaders(idempotencyKey: string | undefined): Record<string, string> {
	return idempotencyKey ? { 
		[IDEMPOTENCY_HEADER]: idempotencyKey
	} : {};
}

export { idempotencyHeaders };
