import { ApiError } from "@shared/api";
import { STREAM_DEFAULT_METHOD } from "../config.ts";
import { readEventStream } from "./read-event-stream.ts";
import { INITIAL_RECONNECT_DELAY_MS, nextReconnectDelay } from "./reconnect-delay.ts";
import { streamHeaders } from "./stream-headers.ts";
import { toStreamError } from "./to-stream-error.ts";

import type { StreamHandlers, StreamRequestInit, Unsubscribe } from "./types.ts";


async function consumeStream(
	init: StreamRequestInit,
	onMessage: StreamHandlers['onMessage'],
	abortSignal: AbortSignal,
): Promise<void> {
	const response = await fetch(init.url, {
		method: init.method ?? STREAM_DEFAULT_METHOD,
		headers: await streamHeaders(init),
		body: init.body === undefined ? undefined : JSON.stringify(init.body),
		signal: abortSignal,
	});

	if (!response.ok) throw await toStreamError(response);
	await readEventStream(response, onMessage);
}

function toApiFailure(error: unknown): ApiError {
	return error instanceof ApiError
		? error
		: new ApiError('internal_error', 'Stream failed', { enveloped: false });
}

function openEventStream(
	init: StreamRequestInit,
	handlers: StreamHandlers,
): Unsubscribe {
	const abortController = new AbortController();
	const abortSignal = init.signal ?? abortController.signal;
	let reconnectDelay = INITIAL_RECONNECT_DELAY_MS;
	let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
	let attempted = false;

	const scheduleReconnect = (): void => {
		if (init.reconnect === false || abortSignal.aborted) {
			return;
		}

		reconnectTimer = setTimeout(() => {
			reconnectDelay = nextReconnectDelay(reconnectDelay);
			runStream();
		}, reconnectDelay);
	};

	function runStream(): void {
		if (attempted) {
			handlers.onReconnect?.();
		}
		attempted = true;

		consumeStream(init, handlers.onMessage, abortSignal)
			.then(() => {
				handlers.onClose?.();
				scheduleReconnect();
			})
			.catch((error: unknown) => {
				if (abortSignal.aborted) return;

				handlers.onError?.(toApiFailure(error));
				scheduleReconnect();
			});
	}

	runStream();

	return () => {
		clearTimeout(reconnectTimer);
		abortController.abort();
	};
}

export { openEventStream };
