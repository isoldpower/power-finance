import type { FC } from "react";

import { PageButton } from "./PageButton.tsx";

interface PaginationProps {
	currentPage: number;
	pageCount: number;
	pages: (number | 'gap')[];
	onPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, pageCount, pages, onPage }) => (
	<div className="flex items-center gap-1">
		<PageButton disabled={currentPage === 1} onClick={() => { onPage(currentPage - 1); }}>‹</PageButton>
		{pages.map((entry, index) => (
			entry === 'gap' ? (
				<span key={`gap-${index.toString()}`} className="px-1 text-text-3">…</span>
			) : (
				<PageButton key={entry} active={entry === currentPage} onClick={() => { onPage(entry); }}>{entry}</PageButton>
			)
		))}
		<PageButton disabled={currentPage === pageCount} onClick={() => { onPage(currentPage + 1); }}>›</PageButton>
	</div>
);

Pagination.displayName = 'Pagination';

export { Pagination };
export type { PaginationProps };
