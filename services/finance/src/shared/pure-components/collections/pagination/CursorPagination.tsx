import { PagerButton } from "./PagerButton.tsx";

import type { FC } from "react";

interface CursorPaginationProps {
	hasPrev: boolean;
	hasNext: boolean;
	onPrev: () => void;
	onNext: () => void;
}

const CursorPagination: FC<CursorPaginationProps> = ({ hasPrev, hasNext, onPrev, onNext }) => (
	<div className="flex items-center gap-1">
		<PagerButton disabled={!hasPrev} onClick={onPrev} aria-label="Previous page">‹</PagerButton>
		<PagerButton disabled={!hasNext} onClick={onNext} aria-label="Next page">›</PagerButton>
	</div>
);

CursorPagination.displayName = 'CursorPagination';

export { CursorPagination };
export type { CursorPaginationProps };
