import type { ApiError } from "../../envelope";


interface StreamMessage {
	event: string;
	data: string;
	id: string | null;
}

interface StreamHandlers {
	onMessage: (message: StreamMessage) => void;
	onError?: (error: ApiError) => void;
	onClose?: () => void;
	onReconnect?: () => void;
}

type TokenSource = () => Promise<string | null>;

interface StreamRequestInit {
	url: string;
	method?: 'GET' | 'POST';
	headers?: Record<string, string>;
	body?: unknown;
	lastEventId?: string | null;
	signal?: AbortSignal;
	authorize?: TokenSource;
	reconnect?: boolean;
}

type Unsubscribe = () => void;

export type { StreamHandlers, StreamMessage, StreamRequestInit, TokenSource, Unsubscribe };
