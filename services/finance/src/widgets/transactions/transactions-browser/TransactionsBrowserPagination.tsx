import { Icons } from "@internal/ui-library";
import { PagerButton, PaginationRange } from "@shared/components";
import { useTransactionsPaginationContext } from "@feature/transactions";


const TransactionsBrowserPagination = () => {
	const { from, to, total, scrollForward, scrollBackward, pageNumber, pageCount } = useTransactionsPaginationContext();

	return (
		<div className="flex items-center gap-2 border-t border-border px-[18px] py-2.5">
			<PaginationRange
				total={total}
				from={from}
				to={to}
			/>
			<div className="flex-1" />
			<PagerButton disabled={pageNumber <= 1} onClick={scrollBackward}>
				<Icons.ChevronLeft size={15} />
			</PagerButton>
			<span className="font-numeric text-[11px] text-text-3">
				{pageNumber} / {pageCount}
			</span>
			<PagerButton disabled={pageNumber >= pageCount} onClick={scrollForward}>
				<Icons.ChevronRight size={15} />
			</PagerButton>
		</div>
	);
}

export { TransactionsBrowserPagination };
