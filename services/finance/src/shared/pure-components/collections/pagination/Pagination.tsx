import { useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "@shared/pure-components/icons";
import { PageButton } from "./PageButton.tsx";

import type { FC } from "react";


interface PaginationProps {
	currentPage: number;
	pageCount: number;
	pages: (number | 'gap')[];
	onPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, pageCount, pages, onPage }) => {
	const handleClickPrevious = useCallback(() => {
		onPage(currentPage - 1);
	}, [currentPage, onPage]);

	const handleClickNext = useCallback(() => {
		onPage(currentPage + 1);
	}, [currentPage, onPage]);
	
	return (
		<div className="flex items-center gap-1">
			<PageButton disabled={currentPage === 1} onClick={handleClickPrevious}>
				<ChevronLeftIcon />
			</PageButton>
			{pages.map((entry, index) => (
				entry === 'gap' ? (
					<span key={`gap-${index.toString()}`} className="px-1 text-text-3">
						<EllipsisIcon />
					</span>
				) : (
					<PageButton
						key={entry}
						active={entry === currentPage}
						onClick={() => { onPage(entry); }}
					>
						{entry}
					</PageButton>
				)
			))}
			<PageButton disabled={currentPage === pageCount} onClick={handleClickNext}>
				<ChevronRightIcon />
			</PageButton>
		</div>
	);
};

Pagination.displayName = 'Pagination';

export { Pagination };
export type { PaginationProps };
