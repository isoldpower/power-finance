import { ApiError } from "../../envelope";
import { FALLBACK_API_ERROR_CODE } from "../errors";
import { buildStreamHeaders } from "./build-stream-headers.ts";
import { readEventStream } from "./read-event-stream.ts";
import { INITIAL_RECONNECT_DELAY_MS, nextReconnectDelay } from "./reconnect-delay.ts";
import { STREAM_DEFAULT_METHOD } from "./stream-config.ts";
import { toStreamError } from "./to-stream-error.ts";

import type { StreamHandlers, StreamMessageListener, StreamRequestInit, Unsubscribe } from "./types.ts";


async function consumeEventStream(
	streamRequestInit: StreamRequestInit,
	onStreamMessage: StreamMessageListener,
	abortSignal: AbortSignal,
): Promise<void> {
	const streamResponse = await fetch(streamRequestInit.url, {
		method: streamRequestInit.method ?? STREAM_DEFAULT_METHOD,
		headers: await buildStreamHeaders(streamRequestInit),
		body: streamRequestInit.body === undefined
			? undefined
			: JSON.stringify(streamRequestInit.body),
		signal: abortSignal,
	});

	if (!streamResponse.ok) {
		throw await toStreamError(streamResponse);
	}

	await readEventStream(streamResponse, onStreamMessage);
}

function toStreamApiError(thrownFailure: unknown): ApiError {
	if (thrownFailure instanceof ApiError) {
		return thrownFailure;
	}

	return new ApiError(
		FALLBACK_API_ERROR_CODE,
		'Stream failed',
		{ enveloped: false },
	);
}

function openEventStream(
	streamRequestInit: StreamRequestInit,
	handlers: StreamHandlers,
): Unsubscribe {
	const abortController = new AbortController();
	const abortSignal = streamRequestInit.signal ?? abortController.signal;
	let reconnectDelayMs = INITIAL_RECONNECT_DELAY_MS;
	let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
	let hasAttemptedBefore = false;

	function scheduleReconnect(): void {
		if (streamRequestInit.reconnect === false || abortSignal.aborted) {
			return;
		}

		reconnectTimer = setTimeout(() => {
			reconnectDelayMs = nextReconnectDelay(reconnectDelayMs);
			startStreamAttempt();
		}, reconnectDelayMs);
	}

	function startStreamAttempt(): void {
		if (hasAttemptedBefore) {
			handlers.onReconnect?.();
		}
		hasAttemptedBefore = true;

		consumeEventStream(streamRequestInit, handlers.onMessage, abortSignal)
			.then(() => {
				handlers.onClose?.();
				scheduleReconnect();
			})
			.catch((thrownFailure: unknown) => {
				if (abortSignal.aborted) return;

				handlers.onError?.(toStreamApiError(thrownFailure));
				scheduleReconnect();
			});
	}

	startStreamAttempt();

	return function unsubscribeFromStream(): void {
		clearTimeout(reconnectTimer);
		abortController.abort();
	};
}

export { openEventStream };
