import { CURSOR_VERSION } from "./config.ts";
import { ApiError } from "../envelope";


interface CursorAnchor {
	direction: 'next' | 'prev';
	index: number;
	query: string;
}

function cursorToRaw(cursor: string): string {
	try {
		return atob(cursor);
	} catch {
		throw new ApiError('cursor_invalid', 'Cursor is malformed or unreadable');
	}
}

function validateDecoded(
	version: string,
	direction: string,
	index: string,
): Omit<CursorAnchor, 'query'> {
	const parsedIndex = Number.parseInt(index, 10);

	if (version !== CURSOR_VERSION || (direction !== 'next' && direction !== 'prev')) {
	throw new ApiError('cursor_invalid', 'Cursor is malformed or unreadable');
} else if (Number.isNaN(parsedIndex)) {
	throw new ApiError('cursor_invalid', 'Cursor is malformed or unreadable');
}

return { direction, index: parsedIndex };
}

const Cursor = {
	getEncoded: (anchor: CursorAnchor): string => {
		const rawCursor = [
			CURSOR_VERSION, 
			anchor.direction,
			String(anchor.index),
			anchor.query
		].join(':');
	
		return btoa(rawCursor).replace(/=+$/, '');
	},
	getDecoded: (cursor: string, query: string) => {
		const rawCursor = cursorToRaw(cursor);
		
		const [rawVersion, rawDirection, rawIndex, ...rest] = rawCursor.split(':');
		const { index, direction } = validateDecoded(rawVersion, rawDirection, rawIndex);

		if (rest.join(':') !== query) {
			throw new ApiError('cursor_mismatch', 'Cursor does not match the query it was sent with');
		} else {
			return { direction, index, query: rest.join(':') };
		}
	}
}

export { Cursor, CURSOR_VERSION };
export type { CursorAnchor };
