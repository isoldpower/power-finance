import {
	DATA_FIELD_NAME,
	EVENT_FIELD_NAME,
	IDENTIFIER_FIELD_NAME,
	STREAM_COMMENT_PREFIX,
	STREAM_DEFAULT_EVENT_NAME,
	STREAM_FIELD_SEPARATOR,
	STREAM_LINE_SEPARATOR,
} from "./stream-config.ts";

import type { StreamMessage } from "./types.ts";


interface StreamFrameField {
	name: string;
	value: string;
}

function parseFrameLine(frameLine: string): StreamFrameField {
	const separatorIndex = frameLine.indexOf(STREAM_FIELD_SEPARATOR);

	if (separatorIndex === -1) {
		return { name: frameLine, value: '' };
	}

	return {
		name: frameLine.slice(0, separatorIndex),
		value: frameLine.slice(separatorIndex + 1).trimStart(),
	};
}

function parseStreamFrame(frameText: string): StreamMessage | null {
	const dataLines: string[] = [];
	let eventName = STREAM_DEFAULT_EVENT_NAME;
	let eventIdentifier: string | null = null;

	for (const frameLine of frameText.split(STREAM_LINE_SEPARATOR)) {
		if (frameLine.startsWith(STREAM_COMMENT_PREFIX)) {
			continue;
		}

		const frameField = parseFrameLine(frameLine);

		if (frameField.name === EVENT_FIELD_NAME) eventName = frameField.value;
		if (frameField.name === IDENTIFIER_FIELD_NAME) eventIdentifier = frameField.value;
		if (frameField.name === DATA_FIELD_NAME) dataLines.push(frameField.value);
	}

	if (dataLines.length === 0) {
		return null;
	}

	return {
		event: eventName,
		id: eventIdentifier,
		data: dataLines.join(STREAM_LINE_SEPARATOR),
	};
}

export { parseStreamFrame };
