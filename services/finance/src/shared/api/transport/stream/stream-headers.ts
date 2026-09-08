import {
	EVENT_STREAM_CONTENT_TYPE,
	JSON_CONTENT_TYPE,
	LAST_EVENT_ID_HEADER,
} from "../config.ts";

import type { StreamRequestInit } from "./types.ts";


const AUTHORIZATION_HEADER = 'Authorization';

async function streamHeaders(init: StreamRequestInit): Promise<Record<string, string>> {
	const token = await init.authorize?.();

	return {
		Accept: EVENT_STREAM_CONTENT_TYPE,
		...(init.body === undefined
			? {}
			: { 'Content-Type': JSON_CONTENT_TYPE }),
		...(init.lastEventId
			? { [LAST_EVENT_ID_HEADER]: init.lastEventId }
			: {}),
		...(token ? { [AUTHORIZATION_HEADER]: `Bearer ${token}` } : {}),
		...init.headers,
	};
}

export { streamHeaders };
