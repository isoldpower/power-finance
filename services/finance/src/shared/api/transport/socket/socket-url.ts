import { SECURE_HTTP_PROTOCOL, SECURE_SOCKET_PROTOCOL, SOCKET_PROTOCOL, SOCKET_SANDBOX_PARAM } from "./config.ts";


interface SocketUrlOptions {
	sandbox?: string;
}

function toSocketUrl(httpUrl: string, options: SocketUrlOptions = {}): string {
	const parsed = new URL(httpUrl);
	parsed.protocol = parsed.protocol === SECURE_HTTP_PROTOCOL
		? SECURE_SOCKET_PROTOCOL
		: SOCKET_PROTOCOL;

	if (options.sandbox !== undefined && options.sandbox !== '') {
		parsed.searchParams.set(SOCKET_SANDBOX_PARAM, options.sandbox);
	}

	return parsed.toString();
}

export { toSocketUrl };
export type { SocketUrlOptions };
