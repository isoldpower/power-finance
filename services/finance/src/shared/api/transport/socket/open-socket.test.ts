import { afterEach, describe, expect, test, vi } from 'vitest';

import { openSocket } from './open-socket.ts';
import { SOCKET_TOKEN_MARKER } from './config.ts';

import type { SocketFrame } from './types.ts';


type Listener = (event: unknown) => void;

class FakeWebSocket {
	public static instances: FakeWebSocket[] = [];
	public static readonly OPEN = 1;

	public readonly url: string;
	public readonly protocols: string | string[] | undefined;
	public readyState = 0;
	public sent: string[] = [];
	public closedWith: number | null = null;

	private readonly listeners = new Map<string, Listener[]>();

	constructor(url: string, protocols?: string | string[]) {
		this.url = url;
		this.protocols = protocols;
		FakeWebSocket.instances.push(this);
	}

	public addEventListener(type: string, listener: Listener): void {
		this.listeners.set(type, [...this.listeners.get(type) ?? [], listener]);
	}

	public send(payload: string): void {
		this.sent.push(payload);
	}

	public close(code: number): void {
		this.closedWith = code;
	}

	public emit(type: string, event: unknown): void {
		for (const listener of this.listeners.get(type) ?? []) {
			listener(event);
		}
	}
}

vi.stubGlobal('WebSocket', FakeWebSocket);

afterEach(() => {
	FakeWebSocket.instances = [];
});

const connect = async (token: string | null) => {
	const frames: SocketFrame[] = [];
	const pending = openSocket(
		{ url: 'ws://localhost:8080/api/v1/chat/advice', authorize: () => Promise.resolve(token) },
		{ onFrame: (frame) => frames.push(frame) },
	);

	await Promise.resolve();
	const socket = FakeWebSocket.instances[0];
	socket.emit('open', {});

	return { connection: await pending, socket, frames };
};

describe('openSocket', () => {
	test('offers the token as the second subprotocol behind the clerk marker', async () => {
		const { socket } = await connect('jwt-token');

		expect(socket.protocols).toEqual([SOCKET_TOKEN_MARKER, 'jwt-token']);
	});

	test('offers no subprotocol when there is no token to send', async () => {
		const { socket } = await connect(null);

		expect(socket.protocols).toEqual([]);
	});

	test('delivers parsed frames to the handler', async () => {
		const { socket, frames } = await connect('jwt-token');

		socket.emit('message', { data: '{"event":"accepted","data":{"message_id":"m1"}}' });

		expect(frames).toEqual([{ event: 'accepted', data: { message_id: 'm1' } }]);
	});

	test('sends the turn as a json frame', async () => {
		const { connection, socket } = await connect('jwt-token');

		connection.send({ text: 'hello' });

		expect(socket.sent).toEqual(['{"text":"hello"}']);
	});

	test('rejects when the handshake closes instead of opening', async () => {
		const pending = openSocket(
			{ url: 'ws://localhost:8080/api/v1/chat/advice', authorize: () => Promise.resolve('jwt') },
			{ onFrame: () => undefined },
		);

		await Promise.resolve();
		FakeWebSocket.instances[0].emit('close', { code: 1008 });

		await expect(pending).rejects.toThrow(/1008/);
	});
});
