import { v4 as createUuid } from "uuid";

import { IDEMPOTENCY_HEADER } from "../headers";


function createIdempotencyKey(): string {
	return createUuid();
}

function idempotencyHeaders(idempotencyKey: string | undefined): Record<string, string> {
	if (idempotencyKey === undefined || idempotencyKey === '') {
		return {};
	}

	return { [IDEMPOTENCY_HEADER]: idempotencyKey };
}

export { createIdempotencyKey, idempotencyHeaders };
