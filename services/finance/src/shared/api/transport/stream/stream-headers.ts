import {
	EVENT_STREAM_CONTENT_TYPE,
	JSON_CONTENT_TYPE,
	LAST_EVENT_ID_HEADER,
} from "../config.ts";

import type { StreamRequestInit } from "./types.ts";


function streamHeaders(init: StreamRequestInit): Record<string, string> {
	return {
		Accept: EVENT_STREAM_CONTENT_TYPE,
		...(init.body === undefined ?
			{} 
			: { 'Content-Type': JSON_CONTENT_TYPE }),
		...(init.lastEventId 
			? { [LAST_EVENT_ID_HEADER]: init.lastEventId }
			: {}),
		...init.headers,
	};
}

export { streamHeaders };
