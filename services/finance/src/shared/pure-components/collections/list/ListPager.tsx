import type { FC } from "react";
import { Icons } from "@internal/ui-library";

import { MetaText } from "@shared/pure-components/typography";

interface ListPagerProps {
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
}

const ListPager: FC<ListPagerProps> = ({ page, pageSize, total, onPageChange }) => {
	const pageCount = Math.max(1, Math.ceil(total / pageSize));
	const start = total === 0 ? 0 : page * pageSize + 1;
	const end = Math.min(total, page * pageSize + pageSize);

	const button = "flex size-7 items-center justify-center rounded-[7px] border border-border-strong text-text-2 transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40";

	return (
		<div className="flex items-center gap-2 border-t border-border px-[18px] py-2.5">
			<MetaText>{start}–{end} of {total}</MetaText>
			<div className="flex-1" />
			<button type="button" aria-label="Previous page" disabled={page === 0} onClick={() => { onPageChange(page - 1); }} className={button}>
				<Icons.ChevronLeft size={15} />
			</button>
			<MetaText>{page + 1} / {pageCount}</MetaText>
			<button type="button" aria-label="Next page" disabled={page >= pageCount - 1} onClick={() => { onPageChange(page + 1); }} className={button}>
				<Icons.ChevronRight size={15} />
			</button>
		</div>
	);
};

ListPager.displayName = 'ListPager';

export { ListPager };
export type { ListPagerProps };
