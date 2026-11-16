import { SESSION_RETRY_DELAYS_MS } from "./config.ts";

import type { GuestDemoSession } from "../types.ts";


interface ObtainGuestDemoSessionWithRetryRequest {
	obtain: () => Promise<GuestDemoSession>;
	signal: AbortSignal;
	retryDelaysMs?: readonly number[];
}

function wait(delayMs: number): Promise<void> {
	return new Promise((resolve) => {
		window.setTimeout(resolve, delayMs);
	});
}

async function obtainGuestDemoSessionWithRetry(request: ObtainGuestDemoSessionWithRetryRequest): Promise<GuestDemoSession> {
	const { obtain, signal, retryDelaysMs = SESSION_RETRY_DELAYS_MS } = request;
	let lastError: unknown;

	for (const delayMs of [0, ...retryDelaysMs]) {
		if (delayMs > 0) {
			await wait(delayMs);
		}

		if (signal.aborted) {
			break;
		}

		try {
			return await obtain();
		} catch (error) {
			lastError = error;
		}
	}

	throw lastError;
}

export { obtainGuestDemoSessionWithRetry };
export type { ObtainGuestDemoSessionWithRetryRequest };
