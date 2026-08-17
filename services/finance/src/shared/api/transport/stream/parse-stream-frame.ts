import { STREAM_DEFAULT_EVENT, STREAM_LINE_SEPARATOR } from "../config.ts";

import type { StreamMessage } from "./types.ts";


const COMMENT_PREFIX = ':';
const FIELD_SEPARATOR = ':';

const parseStreamFrame = (frame: string): StreamMessage | null => {
	const dataLines: string[] = [];
	let eventName = STREAM_DEFAULT_EVENT;
	let eventId: string | null = null;

	for (const frameLine of frame.split(STREAM_LINE_SEPARATOR)) {
		if (frameLine.startsWith(COMMENT_PREFIX)) continue;

		const separatorIndex = frameLine.indexOf(FIELD_SEPARATOR);
		const fieldName = separatorIndex === -1 ? frameLine : frameLine.slice(0, separatorIndex);
		const fieldValue = separatorIndex === -1 ? '' : frameLine.slice(separatorIndex + 1).trimStart();

		if (fieldName === 'event') eventName = fieldValue;
		if (fieldName === 'id') eventId = fieldValue;
		if (fieldName === 'data') dataLines.push(fieldValue);
	}

	if (dataLines.length === 0) return null;

	return {
		event: eventName,
		id: eventId,
		data: dataLines.join(STREAM_LINE_SEPARATOR),
	};
};

export { parseStreamFrame };
