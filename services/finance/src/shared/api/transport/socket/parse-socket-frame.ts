import type { SocketFrame } from "./types.ts";


function parseSocketFrame(raw: string): SocketFrame | null {
	try {
		const parsed: unknown = JSON.parse(raw);

		if (typeof parsed !== 'object' || parsed === null) {
			return null;
		}

		const candidate = parsed as { event?: unknown; data?: unknown };

		return typeof candidate.event === 'string'
			? { event: candidate.event, data: candidate.data }
			: null;
	} catch {
		return null;
	}
}

export { parseSocketFrame };
