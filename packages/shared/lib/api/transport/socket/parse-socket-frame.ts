import type { SocketFrame } from "./types.ts";


interface SocketFrameCandidate {
	event?: unknown;
	data?: unknown;
}

function readFrameCandidate(rawFrame: string): SocketFrameCandidate | null {
	try {
		const parsedFrame: unknown = JSON.parse(rawFrame);

		if (typeof parsedFrame !== 'object' || parsedFrame === null) {
			return null;
		}

		return parsedFrame as SocketFrameCandidate;
	} catch {
		return null;
	}
}

function parseSocketFrame(rawFrame: string): SocketFrame | null {
	const frameCandidate = readFrameCandidate(rawFrame);

	if (frameCandidate === null || typeof frameCandidate.event !== 'string') {
		return null;
	}

	return {
		event: frameCandidate.event,
		data: frameCandidate.data,
		envelope: frameCandidate as Record<string, unknown>,
	};
}

export { parseSocketFrame };
