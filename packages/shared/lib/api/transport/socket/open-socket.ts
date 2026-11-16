import { ApiError } from "../../envelope";
import { parseSocketFrame } from "./parse-socket-frame.ts";
import { NORMAL_CLOSURE_CODE, SOCKET_TOKEN_MARKER } from "./socket-config.ts";

import type { SocketConnection, SocketHandlers, SocketRequestInit } from "./types.ts";


const UNREADABLE_FRAME_MESSAGE = 'Assistant sent an unreadable frame';
const SOCKET_FAILURE_MESSAGE = 'Assistant socket failed';

function socketProtocolsForToken(accessToken: string | null): string[] {
	return accessToken === null ? [] : [SOCKET_TOKEN_MARKER, accessToken];
}

function listenForFrames(openedSocket: WebSocket, handlers: SocketHandlers): void {
	openedSocket.addEventListener('message', (messageEvent: MessageEvent<string>) => {
		const socketFrame = parseSocketFrame(messageEvent.data);

		if (socketFrame === null) {
			handlers.onError?.(new ApiError('internal_error', UNREADABLE_FRAME_MESSAGE, {
				enveloped: false,
			}));

			return;
		}

		handlers.onFrame(socketFrame);
	});

	openedSocket.addEventListener('close', (closeEvent: CloseEvent) => {
		handlers.onClose?.(closeEvent.code);
	});

	openedSocket.addEventListener('error', () => {
		handlers.onError?.(new ApiError('assistant_unavailable', SOCKET_FAILURE_MESSAGE, {
			enveloped: false,
		}));
	});
}

function awaitHandshake(openedSocket: WebSocket): Promise<void> {
	return new Promise<void>((resolveHandshake, rejectHandshake) => {
		if (openedSocket.readyState === WebSocket.OPEN) {
			resolveHandshake();

			return;
		}

		openedSocket.addEventListener('open', () => { resolveHandshake(); }, { once: true });
		openedSocket.addEventListener('close', (closeEvent: CloseEvent) => {
			rejectHandshake(new ApiError(
				'assistant_unavailable',
				`Assistant socket closed during the handshake (${closeEvent.code.toString()})`,
				{ enveloped: false },
			));
		}, { once: true });
	});
}

function toSocketConnection(openedSocket: WebSocket): SocketConnection {
	return {
		send: (payload: unknown) => { openedSocket.send(JSON.stringify(payload)); },
		close: () => { openedSocket.close(NORMAL_CLOSURE_CODE); },
	};
}

async function openSocket(
	socketRequestInit: SocketRequestInit,
	handlers: SocketHandlers,
): Promise<SocketConnection> {
	const accessToken = await socketRequestInit.authorize?.() ?? null;
	const openedSocket = new WebSocket(
		socketRequestInit.url,
		socketProtocolsForToken(accessToken),
	);

	listenForFrames(openedSocket, handlers);
	await awaitHandshake(openedSocket);

	return toSocketConnection(openedSocket);
}

export { openSocket };
