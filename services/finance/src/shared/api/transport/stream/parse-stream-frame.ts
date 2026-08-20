import { STREAM_DEFAULT_EVENT, STREAM_LINE_SEPARATOR } from "../config.ts";

import type { StreamMessage } from "./types.ts";


function parseStreamFrame(frame: string): StreamMessage | null {
	const dataLines: string[] = [];
	let eventName = STREAM_DEFAULT_EVENT;
	let eventId: string | null = null;

	for (const frameLine of frame.split(STREAM_LINE_SEPARATOR)) {
		if (!frameLine.startsWith(':')) {
			const separatorIndex = frameLine.indexOf(':');
			const fieldName = separatorIndex === -1 
				? frameLine 
				: frameLine.slice(0, separatorIndex);
			const fieldValue = separatorIndex === -1 
				? '' 
				: frameLine.slice(separatorIndex + 1).trimStart();
	
			if (fieldName === 'event') eventName = fieldValue;
			if (fieldName === 'id') eventId = fieldValue;
			if (fieldName === 'data') dataLines.push(fieldValue);
		}
	}

	return dataLines.length !== 0 ? {
		event: eventName,
		id: eventId,
		data: dataLines.join(STREAM_LINE_SEPARATOR),
	} : null;
}

export { parseStreamFrame };
