import { ApiError } from "../../envelope";
import { NORMAL_CLOSURE_CODE, SOCKET_TOKEN_MARKER } from "./config.ts";
import { parseSocketFrame } from "./parse-socket-frame.ts";

import type { SocketConnection, SocketHandlers, SocketRequestInit } from "./types.ts";


function protocolsFor(token: string | null): string[] {
	return token === null ? [] : [SOCKET_TOKEN_MARKER, token];
}

async function openSocket(
	init: SocketRequestInit,
	handlers: SocketHandlers,
): Promise<SocketConnection> {
	const token = await init.authorize?.() ?? null;
	const socket = new WebSocket(init.url, protocolsFor(token));

	socket.addEventListener('message', (event: MessageEvent<string>) => {
		const frame = parseSocketFrame(event.data);

		if (frame === null) {
			handlers.onError?.(new ApiError('internal_error', 'Assistant sent an unreadable frame', {
				enveloped: false,
			}));

			return;
		}

		handlers.onFrame(frame);
	});

	socket.addEventListener('close', (event: CloseEvent) => {
		handlers.onClose?.(event.code);
	});

	socket.addEventListener('error', () => {
		handlers.onError?.(new ApiError('assistant_unavailable', 'Assistant socket failed', {
			enveloped: false,
		}));
	});

	await new Promise<void>((resolve, reject) => {
		if (socket.readyState === WebSocket.OPEN) {
			resolve();

			return;
		}

		socket.addEventListener('open', () => { resolve(); }, { once: true });
		socket.addEventListener('close', (event: CloseEvent) => {
			reject(new ApiError(
				'assistant_unavailable',
				`Assistant socket closed during the handshake (${event.code.toString()})`,
				{ enveloped: false },
			));
		}, { once: true });
	});

	return {
		send: (payload: unknown) => { socket.send(JSON.stringify(payload)); },
		close: () => { socket.close(NORMAL_CLOSURE_CODE); },
	};
}

export { openSocket };
