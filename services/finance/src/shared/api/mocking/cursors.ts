import { ApiError } from "../envelope";

type CursorDirection = 'next' | 'prev';


interface CursorAnchor {
	direction: CursorDirection;
	index: number;
	query: string;
}

const CURSOR_VERSION = 'v1';

const encodeCursor = (anchor: CursorAnchor): string => {
	const raw = [CURSOR_VERSION, anchor.direction, String(anchor.index), anchor.query].join(':');

	return btoa(raw).replace(/=+$/, '');
};

const decodeCursor = (cursor: string, query: string): CursorAnchor => {
	let raw: string;

	try {
		raw = atob(cursor);
	} catch {
		throw new ApiError('cursor_invalid', 'Cursor is malformed or unreadable');
	}

	const [version, direction, index, ...rest] = raw.split(':');
	const anchorQuery = rest.join(':');

	if (version !== CURSOR_VERSION || (direction !== 'next' && direction !== 'prev')) {
		throw new ApiError('cursor_invalid', 'Cursor is malformed or unreadable');
	}

	const parsedIndex = Number.parseInt(index, 10);
	if (Number.isNaN(parsedIndex)) {
		throw new ApiError('cursor_invalid', 'Cursor is malformed or unreadable');
	}

	if (anchorQuery !== query) {
		throw new ApiError('cursor_mismatch', 'Cursor does not match the query it was sent with');
	}

	return { direction, index: parsedIndex, query: anchorQuery };
};

export { encodeCursor, decodeCursor, CURSOR_VERSION };
export type { CursorAnchor, CursorDirection };
