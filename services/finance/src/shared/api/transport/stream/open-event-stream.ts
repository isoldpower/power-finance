import { ApiError } from "@shared/api";
import { STREAM_DEFAULT_METHOD } from "../config.ts";
import { readEventStream } from "./read-event-stream.ts";
import { streamHeaders } from "./stream-headers.ts";
import { toStreamError } from "./to-stream-error.ts";

import type { StreamHandlers, StreamRequestInit, Unsubscribe } from "./types.ts";


async function consumeStream(
	init: StreamRequestInit,
	onMessage: StreamHandlers['onMessage'],
	abortSignal?: AbortSignal,
): Promise<void> {
	const response = await fetch(init.url, {
		method: init.method ?? STREAM_DEFAULT_METHOD,
		headers: streamHeaders(init),
		body: init.body === undefined ? undefined : JSON.stringify(init.body),
		signal: abortSignal,
	});

	if (!response.ok) throw await toStreamError(response);
	await readEventStream(response, onMessage);
}

function openEventStream(
	init: StreamRequestInit,
	handlers: StreamHandlers,
): Unsubscribe {
	const abortController = new AbortController();
	const abortSignal = init.signal ?? abortController.signal;

	consumeStream(init, handlers.onMessage, abortSignal)
		.then(() => { 
			handlers.onClose?.(); 
		})
		.catch((error: unknown) => {
			if (abortSignal.aborted) return;

			const errorInstance = error instanceof ApiError
				? error
				: new ApiError('internal_error', 'Stream failed');
			handlers.onError?.(errorInstance);
		});

	return () => { 
		abortController.abort(); 
	};
}

export { openEventStream };
