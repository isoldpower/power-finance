import {
	ACCEPT_HEADER,
	AUTHORIZATION_HEADER,
	CONTENT_TYPE_HEADER,
	EVENT_STREAM_CONTENT_TYPE,
	JSON_CONTENT_TYPE,
	LAST_EVENT_ID_HEADER,
} from "../headers";

import type { StreamRequestInit } from "./types.ts";


async function buildStreamHeaders(streamRequestInit: StreamRequestInit): Promise<Record<string, string>> {
	const accessToken = await streamRequestInit.authorize?.();

	return {
		[ACCEPT_HEADER]: EVENT_STREAM_CONTENT_TYPE,
		...(streamRequestInit.body === undefined
			? {}
			: { [CONTENT_TYPE_HEADER]: JSON_CONTENT_TYPE }),
		...(streamRequestInit.lastEventId
			? { [LAST_EVENT_ID_HEADER]: streamRequestInit.lastEventId }
			: {}),
		...(accessToken ? { [AUTHORIZATION_HEADER]: `Bearer ${accessToken}` } : {}),
		...streamRequestInit.headers,
	};
}

export { buildStreamHeaders };
