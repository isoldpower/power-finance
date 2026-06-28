import type { FC } from "react";
import { cn, FinanceCard } from "@internal/ui-library";

import { useTransactionBrowser, buildPages } from "@feature/transaction";
import type { PanelMode } from "@feature/management";
import { SectionHeader } from "@entity/management";
import {
	FilterChip,
	TransactionSearchInput,
	BulkActionsBar,
	TransactionsTableHeader,
	TransactionRow,
	TransactionsEmptyState,
	Pagination,
} from "@entity/transaction";

import { TRANSACTIONS_SECTION_ID, TXN_PAGE_SIZE, TXN_SORT_OPTIONS, TXN_TYPE_OPTIONS } from "./config.ts";

interface TransactionsSectionProps {
	onOpenPanel: (mode: PanelMode) => void;
	className?: string;
}

const TransactionsSection: FC<TransactionsSectionProps> = ({ onOpenPanel, className }) => {
	const {
		isPending,
		convert,
		formatCurrency,
		targetCurrency,
		total,
		query,
		setQuery,
		walletFilter,
		setWalletFilter,
		sort,
		setSort,
		typeFilter,
		setTypeFilter,
		selected,
		toggleSelect,
		clearSelect,
		expanded,
		toggleExpand,
		rows,
		pageRows,
		currentPage,
		pageCount,
		rangeStart,
		rangeEnd,
		hasFilters,
		setPage,
		walletLabel,
		sortLabel,
		walletOptions,
	} = useTransactionBrowser({ pageSize: TXN_PAGE_SIZE, sortOptions: TXN_SORT_OPTIONS });

	return (
		<section id={TRANSACTIONS_SECTION_ID} className={cn("scroll-mt-[80px]", className)}>
			<SectionHeader
				title="Transactions"
				caption="Each row posts to the ledger"
				action={
					<button type="button" onClick={() => { onOpenPanel('add'); }} className="whitespace-nowrap text-xs font-semibold text-primary hover:underline">
						＋ New transaction
					</button>
				}
			/>
			<FinanceCard className="overflow-visible">
				<div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
					<TransactionSearchInput value={query} onValueChange={setQuery} onClear={() => { setQuery(''); }} />
					<FilterChip
						label={walletLabel}
						active={walletFilter !== 'all'}
						onSelect={setWalletFilter}
						options={walletOptions}
					/>
					<FilterChip
						label={typeFilter === 'all' ? 'All types' : typeFilter}
						active={typeFilter !== 'all'}
						onSelect={setTypeFilter}
						options={TXN_TYPE_OPTIONS}
					/>
					<FilterChip
						label={`Sort: ${sortLabel}`}
						active={sort !== 'recent'}
						onSelect={setSort}
						options={TXN_SORT_OPTIONS}
					/>
				</div>

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

				{!isPending && pageRows.length > 0 && pageRows.length < TXN_PAGE_SIZE ? (
					Array.from({ length: TXN_PAGE_SIZE - pageRows.length }).map((_, index) => (
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
								pages={buildPages(currentPage, pageCount)}
								onPage={setPage}
							/>
						) : null}
					</div>
				) : null}
			</FinanceCard>
		</section>
	);
};

TransactionsSection.displayName = 'TransactionsSection';

export { TransactionsSection };
export type { TransactionsSectionProps };
