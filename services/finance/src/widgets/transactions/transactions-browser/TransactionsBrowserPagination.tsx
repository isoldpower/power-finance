import { useMemo } from "react";

import { useTransactionsPaginationContext } from "@feature/transactions";
import { Pagination, PaginationRange, toPageEntries } from "@shared/pure-components/collections";


const TransactionsBrowserPagination = () => {
	const { from, to, total, pageNumber, pageCount, goToPage } = useTransactionsPaginationContext();

	const pages = useMemo(() => toPageEntries(pageNumber, pageCount), [pageCount, pageNumber]);

	return (
		<div className="flex items-center gap-2 border-t border-border px-4 py-2.5">
			<PaginationRange
				total={total}
				from={from}
				to={to}
			/>
			<div className="flex-1" />
			{pageCount > 1 ? (
				<Pagination
					currentPage={pageNumber}
					pageCount={pageCount}
					pages={pages}
					onPage={goToPage}
				/>
			) : null}
		</div>
	);
}

export { TransactionsBrowserPagination };
