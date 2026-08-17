import { ApiError, apiErrorFromEnvelope } from "../envelope";

interface StreamMessage {
	event: string;
	data: string;
	id: string | null;
}

interface StreamHandlers {
	onMessage: (message: StreamMessage) => void;
	onError?: (error: ApiError) => void;
	onClose?: () => void;
}

interface StreamRequestInit {
	url: string;
	method?: 'GET' | 'POST';
	headers?: Record<string, string>;
	body?: unknown;
	lastEventId?: string | null;
	signal?: AbortSignal;
}

type Unsubscribe = () => void;

const LAST_EVENT_ID_HEADER = 'Last-Event-ID';

const parseFrame = (frame: string): StreamMessage | null => {
	const lines = frame.split('\n');
	const data: string[] = [];
	let event = 'message';
	let id: string | null = null;

	for (const line of lines) {
		if (line.startsWith(':')) continue;

		const separator = line.indexOf(':');
		const field = separator === -1 ? line : line.slice(0, separator);
		const value = separator === -1 ? '' : line.slice(separator + 1).trimStart();

		if (field === 'event') event = value;
		if (field === 'id') id = value;
		if (field === 'data') data.push(value);
	}

	return data.length > 0 ? { event, data: data.join('\n'), id } : null;
};

const readEventStream = async (response: Response, onMessage: (message: StreamMessage) => void): Promise<void> => {
	const body = response.body;
	if (!body) throw new ApiError('internal_error', 'Response carries no stream body');

	const reader = body.pipeThrough(new TextDecoderStream()).getReader();
	let buffer = '';

	for (;;) {
		const chunk = await reader.read();
		if (chunk.done) break;

		buffer += chunk.value;

		let boundary = buffer.indexOf('\n\n');
		while (boundary !== -1) {
			const message = parseFrame(buffer.slice(0, boundary));
			buffer = buffer.slice(boundary + 2);
			if (message) onMessage(message);
			boundary = buffer.indexOf('\n\n');
		}
	}
};

const streamFailure = async (response: Response): Promise<ApiError> => {
	try {
		return apiErrorFromEnvelope(await response.json(), response.statusText);
	} catch {
		return new ApiError('internal_error', response.statusText);
	}
};

const openEventStream = (init: StreamRequestInit, handlers: StreamHandlers): Unsubscribe => {
	const controller = new AbortController();
	const signal = init.signal ?? controller.signal;

	const consume = async (): Promise<void> => {
		const response = await fetch(init.url, {
			method: init.method ?? 'GET',
			headers: {
				Accept: 'text/event-stream',
				...(init.body === undefined ? {} : { 'Content-Type': 'application/json' }),
				...(init.lastEventId ? { [LAST_EVENT_ID_HEADER]: init.lastEventId } : {}),
				...init.headers,
			},
			body: init.body === undefined ? undefined : JSON.stringify(init.body),
			signal,
		});

		if (!response.ok) throw await streamFailure(response);

		await readEventStream(response, handlers.onMessage);
	};

	consume()
		.then(() => { handlers.onClose?.(); })
		.catch((error: unknown) => {
			if (signal.aborted) return;

			handlers.onError?.(error instanceof ApiError ? error : new ApiError('internal_error', 'Stream failed'));
		});

	return () => { controller.abort(); };
};

export { LAST_EVENT_ID_HEADER, openEventStream, readEventStream };
export type { StreamHandlers, StreamMessage, StreamRequestInit, Unsubscribe };
