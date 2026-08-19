import { ApiError } from "../../envelope";
import { STREAM_FRAME_SEPARATOR } from "../config.ts";
import { parseStreamFrame } from "./parse-stream-frame.ts";

import type { StreamMessage } from "./types.ts";


function drainFrames(
	frameBuffer: string,
	onMessage: (message: StreamMessage) => void,
): string {
	let frameEnd = frameBuffer.indexOf(STREAM_FRAME_SEPARATOR);

	while (frameEnd !== -1) {
		const streamMessage = parseStreamFrame(frameBuffer.slice(0, frameEnd));
		if (streamMessage) {
			onMessage(streamMessage);
		}
		
		frameBuffer = frameBuffer.slice(frameEnd + STREAM_FRAME_SEPARATOR.length);
		frameEnd = frameBuffer.indexOf(STREAM_FRAME_SEPARATOR);
	}

	return frameBuffer;
}

async function readEventStream(
	response: Response,
	onMessage: (message: StreamMessage) => void,
): Promise<void> {
	const streamBody = response.body;
	if (!streamBody) throw new ApiError(
		'internal_error',
		'Response carries no stream body',
	);

	const streamReader = streamBody
		.pipeThrough(new TextDecoderStream())
		.getReader();
	
	let frameBuffer = '';
	let streamChunk = await streamReader.read();
	while (!streamChunk.done) {
		frameBuffer = drainFrames(frameBuffer + streamChunk.value, onMessage);
		streamChunk = await streamReader.read();
	}
}

export { readEventStream };
