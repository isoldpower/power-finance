import { ApiError } from "@shared/api";

import { STREAM_DEFAULT_METHOD } from "../config.ts";
import { readEventStream } from "./read-event-stream.ts";
import { streamHeaders } from "./stream-headers.ts";
import { toStreamError } from "./to-stream-error.ts";

import type { StreamHandlers, StreamRequestInit, Unsubscribe } from "./types.ts";


const FALLBACK_STREAM_MESSAGE = 'Stream failed';

const openEventStream = (init: StreamRequestInit, handlers: StreamHandlers): Unsubscribe => {
	const abortController = new AbortController();
	const abortSignal = init.signal ?? abortController.signal;

	const consumeStream = async (): Promise<void> => {
		const response = await fetch(init.url, {
			method: init.method ?? STREAM_DEFAULT_METHOD,
			headers: streamHeaders(init),
			body: init.body === undefined ? undefined : JSON.stringify(init.body),
			signal: abortSignal,
		});

		if (!response.ok) throw await toStreamError(response);

		await readEventStream(response, handlers.onMessage);
	};

	consumeStream()
		.then(() => { handlers.onClose?.(); })
		.catch((error: unknown) => {
			if (abortSignal.aborted) return;

			handlers.onError?.(
				error instanceof ApiError ? error : new ApiError('internal_error', FALLBACK_STREAM_MESSAGE)
			);
		});

	return () => { abortController.abort(); };
};

export { openEventStream };
