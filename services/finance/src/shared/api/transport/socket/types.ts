import type { ApiError } from "../../envelope";
import type { TokenSource } from "../stream";


interface SocketFrame {
	event: string;
	data: unknown;
	envelope: Record<string, unknown>;
}

interface SocketHandlers {
	onFrame: (frame: SocketFrame) => void;
	onError?: (error: ApiError) => void;
	onClose?: (code: number) => void;
}

interface SocketRequestInit {
	url: string;
	authorize?: TokenSource;
}

interface SocketConnection {
	send: (payload: unknown) => void;
	close: () => void;
}

export type { SocketConnection, SocketFrame, SocketHandlers, SocketRequestInit };
