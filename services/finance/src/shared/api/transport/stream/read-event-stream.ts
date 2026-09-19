import { ApiError } from "../../envelope";
import { FALLBACK_API_ERROR_CODE } from "../errors";
import { parseStreamFrame } from "./parse-stream-frame.ts";
import { STREAM_FRAME_SEPARATOR } from "./stream-config.ts";

import type { StreamMessageListener } from "./types.ts";


function drainCompletedFrames(
	bufferedText: string,
	onStreamMessage: StreamMessageListener,
): string {
	let remainingText = bufferedText;
	let frameEndIndex = remainingText.indexOf(STREAM_FRAME_SEPARATOR);

	while (frameEndIndex !== -1) {
		const streamMessage = parseStreamFrame(
			remainingText.slice(0, frameEndIndex)
		);

		if (streamMessage) {
			onStreamMessage(streamMessage);
		}

		remainingText = remainingText.slice(frameEndIndex + STREAM_FRAME_SEPARATOR.length);
		frameEndIndex = remainingText.indexOf(STREAM_FRAME_SEPARATOR);
	}

	return remainingText;
}

async function readEventStream(
	streamResponse: Response,
	onStreamMessage: StreamMessageListener,
): Promise<void> {
	const responseBody = streamResponse.body;
	if (!responseBody) {
		throw new ApiError(FALLBACK_API_ERROR_CODE, 'Response carries no stream body');
	}

	const decodedReader = responseBody
		.pipeThrough(new TextDecoderStream())
		.getReader();

	let bufferedText = '';
	let decodedChunk = await decodedReader.read();

	while (!decodedChunk.done) {
		bufferedText = drainCompletedFrames(
			bufferedText + decodedChunk.value,
			onStreamMessage,
		);
		decodedChunk = await decodedReader.read();
	}
}

export { readEventStream };
