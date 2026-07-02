import type { FC } from "react";

import {
	BulkActionsBar,
	TransactionsTableHeader,
	TransactionsEmptyState,
	Pagination,
} from "@entity/transactions";
import { TransactionRow } from "./TransactionRow.tsx";
import type { TransactionRowView } from "@entity/transactions";
import type { ConvertedMoney, Money } from "@feature/localization";

interface TransactionsTableProps {
	isPending: boolean;
	targetCurrency: string;
	pageRows: TransactionRowView[];
	rows: TransactionRowView[];
	total: number | string;
	convert: (money: Money) => ConvertedMoney;
	formatCurrency: (amount: number, currency: string) => string;
	selected: Set<string>;
	expanded: Set<string>;
	toggleSelect: (id: string) => void;
	toggleExpand: (id: string) => void;
	clearSelect: () => void;
	pageSize: number;
	currentPage: number;
	pageCount: number;
	pages: (number | 'gap')[];
	rangeStart: number;
	rangeEnd: number;
	hasFilters: boolean;
	setPage: (page: number) => void;
}

const TransactionsTable: FC<TransactionsTableProps> = ({
	isPending,
	targetCurrency,
	pageRows,
	rows,
	total,
	convert,
	formatCurrency,
	selected,
	expanded,
	toggleSelect,
	toggleExpand,
	clearSelect,
	pageSize,
	currentPage,
	pageCount,
	pages,
	rangeStart,
	rangeEnd,
	hasFilters,
	setPage,
}) => {
	return (
		<>
			{selected.size > 0 ? (
				<BulkActionsBar count={selected.size} onClear={clearSelect} />
			) : null}

			<TransactionsTableHeader targetCurrency={targetCurrency} />

			{isPending ? (
				<div className="px-4 py-10 text-center text-[13px] text-text-3">Loading…</div>
			) : (
				pageRows.map((row) => {
					const main = convert({ amount: row.amount, currency: row.currency });
					return (
						<TransactionRow
							key={row.id}
							row={row}
							amountOriginal={formatCurrency(row.amount, row.currency)}
							amountMain={main.formatted}
							converted={main.converted}
							selected={selected.has(row.id)}
							expanded={expanded.has(row.id)}
							onSelect={() => { toggleSelect(row.id); }}
							onExpand={() => { toggleExpand(row.id); }}
						/>
					);
				})
			)}

			{!isPending && pageRows.length > 0 && pageRows.length < pageSize ? (
				Array.from({ length: pageSize - pageRows.length }).map((_, index) => (
					<div key={`pad-${index.toString()}`} aria-hidden="true" className="h-14 border-b border-border last:border-b-0" />
				))
			) : null}

			{!isPending && rows.length === 0 ? (
				<TransactionsEmptyState />
			) : null}

			{!isPending && rows.length > 0 ? (
				<div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 text-xs text-text-3">
					{hasFilters ? (
						<span>Showing <b className="text-text-2">{rangeStart}–{rangeEnd}</b> of {rows.length} filtered · {total} total</span>
					) : (
						<span>Showing <b className="text-text-2">{rangeStart}–{rangeEnd}</b> of {total}</span>
					)}
					<div className="flex-1" />
					{pageCount > 1 ? (
						<Pagination
							currentPage={currentPage}
							pageCount={pageCount}
							pages={pages}
							onPage={setPage}
						/>
					) : null}
				</div>
			) : null}
		</>
	);
};

TransactionsTable.displayName = 'TransactionsTable';

export { TransactionsTable };
export type { TransactionsTableProps };
