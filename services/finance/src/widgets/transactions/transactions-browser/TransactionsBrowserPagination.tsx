import { useTransactionsPaginationContext } from "@feature/transactions";
import { CursorPagination, PaginationRange } from "@shared/pure-components/collections";


const TransactionsBrowserPagination = () => {
	const { from, to, total, hasNext, hasPrev, scrollForward, scrollBackward } = useTransactionsPaginationContext();

	return (
		<div className="flex items-center gap-2 border-t border-border px-4 py-2.5">
			<PaginationRange
				total={total}
				from={from}
				to={to}
			/>
			<div className="flex-1" />
			{hasNext || hasPrev ? (
				<CursorPagination
					hasNext={hasNext}
					hasPrev={hasPrev}
					onNext={scrollForward}
					onPrev={scrollBackward}
				/>
			) : null}
		</div>
	);
}

export { TransactionsBrowserPagination };
