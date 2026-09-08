import { SECURE_HTTP_PROTOCOL, SECURE_SOCKET_PROTOCOL, SOCKET_PROTOCOL } from "./config.ts";


function toSocketUrl(httpUrl: string): string {
	const parsed = new URL(httpUrl);
	parsed.protocol = parsed.protocol === SECURE_HTTP_PROTOCOL
		? SECURE_SOCKET_PROTOCOL
		: SOCKET_PROTOCOL;

	return parsed.toString();
}

export { toSocketUrl };
