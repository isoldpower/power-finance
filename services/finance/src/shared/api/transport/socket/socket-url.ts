import {
	SECURE_HTTP_PROTOCOL,
	SECURE_SOCKET_PROTOCOL,
	SOCKET_PROTOCOL,
	SOCKET_SANDBOX_PARAM,
} from "./socket-config.ts";


interface SocketUrlOptions {
	sandbox?: string;
}

function toSocketUrl(httpUrl: string, options: SocketUrlOptions = {}): string {
	const parsedUrl = new URL(httpUrl);
	parsedUrl.protocol = parsedUrl.protocol === SECURE_HTTP_PROTOCOL
		? SECURE_SOCKET_PROTOCOL
		: SOCKET_PROTOCOL;

	if (options.sandbox !== undefined && options.sandbox !== '') {
		parsedUrl.searchParams.set(SOCKET_SANDBOX_PARAM, options.sandbox);
	}

	return parsedUrl.toString();
}

export { toSocketUrl };
export type { SocketUrlOptions };
