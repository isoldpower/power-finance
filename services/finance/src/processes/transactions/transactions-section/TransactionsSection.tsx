import type { FC } from "react";
import { cn, FinanceCard } from "@internal/ui-library";

import { useTransactionBrowser, buildPages } from "@feature/transactions";
import type { PanelMode } from "@feature/wallets";
import { SectionHeader } from "@shared/components";
import { TransactionsToolbar } from "@widget/transactions/toolbar/TransactionsToolbar.tsx";
import { TransactionsTable } from "@widget/transactions/table/TransactionsTable.tsx";
import { TRANSACTIONS_SECTION_ID, TXN_PAGE_SIZE, TXN_SORT_OPTIONS, TXN_TYPE_OPTIONS } from "@widget/transactions/config.ts";

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
				<TransactionsToolbar
					query={query}
					setQuery={setQuery}
					walletLabel={walletLabel}
					walletActive={walletFilter !== 'all'}
					onWallet={setWalletFilter}
					walletOptions={walletOptions}
					typeLabel={typeFilter === 'all' ? 'All types' : typeFilter}
					typeActive={typeFilter !== 'all'}
					onType={setTypeFilter}
					typeOptions={TXN_TYPE_OPTIONS}
					sortLabel={sortLabel}
					sortActive={sort !== 'recent'}
					onSort={setSort}
					sortOptions={TXN_SORT_OPTIONS}
				/>
				<TransactionsTable
					isPending={isPending}
					targetCurrency={targetCurrency}
					pageRows={pageRows}
					rows={rows}
					total={total}
					convert={convert}
					formatCurrency={formatCurrency}
					selected={selected}
					expanded={expanded}
					toggleSelect={toggleSelect}
					toggleExpand={toggleExpand}
					clearSelect={clearSelect}
					pageSize={TXN_PAGE_SIZE}
					currentPage={currentPage}
					pageCount={pageCount}
					pages={buildPages(currentPage, pageCount)}
					rangeStart={rangeStart}
					rangeEnd={rangeEnd}
					hasFilters={hasFilters}
					setPage={setPage}
				/>
			</FinanceCard>
		</section>
	);
};

TransactionsSection.displayName = 'TransactionsSection';

export { TransactionsSection };
export type { TransactionsSectionProps };
