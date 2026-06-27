import type { FC, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
	cn,
	FinanceCard,
	FinanceBadge,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";

import { useTransactionsList } from "@feature/transaction";
import { useWalletsList } from "@feature/wallet";
import { useConvertMoney } from "@feature/fx";
import { useLocaleCurrency } from "@shared/utils";

import { SectionHeader } from "./SectionHeader.tsx";
import { TRANSACTIONS_SECTION_ID } from "./constants.ts";
import { toTransactionRow } from "./adapters.ts";
import type { TransactionRowView } from "./adapters.ts";
import type { PanelMode } from "./mock.ts";

interface TransactionsSectionProps {
	onOpenPanel: (mode: PanelMode) => void;
	className?: string;
}

interface FilterChipProps {
	label: ReactNode;
	active: boolean;
	options: { value: string; label: string }[];
	onSelect: (value: string) => void;
}

const FilterChip: FC<FilterChipProps> = ({ label, active, options, onSelect }) => (
	<FinanceMenu>
		<FinanceMenuTrigger asChild>
			<button
				type="button"
				className={cn(
					"flex items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-2 text-xs font-semibold",
					active ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary" : "border-border-strong text-text-2"
				)}
			>
				{label} <span className="text-[9px] text-text-3">▾</span>
			</button>
		</FinanceMenuTrigger>
		<FinanceMenuContent align="start" className="min-w-44">
			{options.map((option) => (
				<FinanceMenuItem key={option.value} onClick={() => { onSelect(option.value); }}>
					{option.label}
				</FinanceMenuItem>
			))}
		</FinanceMenuContent>
	</FinanceMenu>
);

const PAGE_SIZE = 8;

// Compact page list: all pages when few, else first/last + a window around the current page.
const buildPages = (current: number, count: number): (number | 'gap')[] => {
	if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);
	const pages: (number | 'gap')[] = [1];
	const start = Math.max(2, current - 1);
	const end = Math.min(count - 1, current + 1);
	if (start > 2) pages.push('gap');
	for (let page = start; page <= end; page += 1) pages.push(page);
	if (end < count - 1) pages.push('gap');
	pages.push(count);
	return pages;
};

const PageButton: FC<{ active?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }> = ({ active = false, disabled = false, onClick, children }) => (
	<button
		type="button"
		disabled={disabled}
		onClick={onClick}
		className={cn(
			"flex h-7 min-w-7 items-center justify-center rounded-[var(--radius-md)] border px-2 text-xs font-semibold transition-colors",
			active ? "border-primary bg-primary text-white" : "border-border-strong text-text-2 hover:bg-secondary",
			disabled && "cursor-not-allowed opacity-40 hover:bg-transparent"
		)}
	>
		{children}
	</button>
);

const SORT_OPTIONS = [
	{ value: 'recent', label: 'Most recent' },
	{ value: 'amount', label: 'Amount: high → low' },
];

const TYPE_OPTIONS = [
	{ value: 'all', label: 'All types' },
	{ value: 'income', label: 'income' },
	{ value: 'expense', label: 'expense' },
];

const TransactionsSection: FC<TransactionsSectionProps> = ({ onOpenPanel, className }) => {
	const { transactions, isPending } = useTransactionsList();
	const { wallets } = useWalletsList();
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const navigate = useNavigate();
	const search = useSearch({ strict: false });
	const walletFilter = search.wallet ?? 'all';
	const sort = search.sort ?? 'recent';

	const setWalletFilter = (value: string) => {
		void navigate({ to: '.', search: (prev) => ({ ...prev, wallet: value }) });
	};
	const setSort = (value: string) => {
		void navigate({ to: '.', search: (prev) => ({ ...prev, sort: value as 'recent' | 'amount' }) });
	};

	const [query, setQuery] = useState('');
	const [typeFilter, setTypeFilter] = useState('all');
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [expanded, setExpanded] = useState<Set<string>>(new Set());

	const walletById = useMemo(
		() => new Map(wallets.map((wallet) => [wallet.id, { name: wallet.name, currency: wallet.balance.currency }])),
		[wallets]
	);

	const rows = useMemo(() => {
		const mapped = transactions.map((txn) => toTransactionRow(txn, walletById, formatCurrency));
		const filtered = mapped.filter((row) => {
			const haystack = `${row.walletName} ${row.amount.toString()} ${row.category}`.toLowerCase();
			const matchesQuery = haystack.includes(query.toLowerCase());
			const matchesWallet = walletFilter === 'all' || row.walletId === walletFilter;
			const matchesType = typeFilter === 'all'
				|| (typeFilter === 'income' && row.amount >= 0)
				|| (typeFilter === 'expense' && row.amount < 0);
			return matchesQuery && matchesWallet && matchesType;
		});
		if (sort === 'amount') return [...filtered].sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
		return [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}, [transactions, walletById, formatCurrency, query, walletFilter, typeFilter, sort]);

	const hasFilters = query !== '' || walletFilter !== 'all' || typeFilter !== 'all';

	const [page, setPage] = useState(1);
	useEffect(() => { setPage(1); }, [query, walletFilter, typeFilter, sort]);

	const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount);
	const pageRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
	const rangeStart = rows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
	const rangeEnd = Math.min(currentPage * PAGE_SIZE, rows.length);

	const toggle = (set: Set<string>, id: string) => {
		const next = new Set(set);
		if (next.has(id)) next.delete(id); else next.add(id);
		return next;
	};

	const walletLabel = walletFilter === 'all'
		? 'All wallets'
		: walletById.get(walletFilter)?.name ?? 'All wallets';
	const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label ?? '';

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
					<div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-3 py-2 focus-within:border-[var(--accent-border)]">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
							<circle cx="11" cy="11" r="7" />
							<line x1="21" y1="21" x2="16.65" y2="16.65" />
						</svg>
						<input
							value={query}
							onChange={(event) => { setQuery(event.target.value); }}
							placeholder="Search wallet, amount…"
							className="min-w-0 flex-1 border-none bg-transparent text-[13px] outline-none placeholder:text-[var(--text-3)]"
						/>
						{query ? (
							<button type="button" onClick={() => { setQuery(''); }} className="text-sm leading-none text-text-3">✕</button>
						) : null}
					</div>
					<FilterChip
						label={walletLabel}
						active={walletFilter !== 'all'}
						onSelect={setWalletFilter}
						options={[{ value: 'all', label: 'All wallets' }, ...wallets.map((wallet) => ({ value: wallet.id, label: wallet.name }))]}
					/>
					<FilterChip
						label={typeFilter === 'all' ? 'All types' : typeFilter}
						active={typeFilter !== 'all'}
						onSelect={setTypeFilter}
						options={TYPE_OPTIONS}
					/>
					<FilterChip
						label={`Sort: ${sortLabel}`}
						active={sort !== 'recent'}
						onSelect={setSort}
						options={SORT_OPTIONS}
					/>
				</div>

				{selected.size > 0 ? (
					<div className="flex items-center gap-3.5 border-b border-border bg-[var(--accent-soft)] px-4 py-2.5 text-[12.5px]">
						<span className="font-semibold text-primary">{selected.size} selected</span>
						<span className="cursor-pointer text-text-2 hover:underline">Recategorize</span>
						<span className="cursor-pointer text-text-2 hover:underline">Change wallet</span>
						<span className="cursor-pointer text-neg hover:underline">Delete</span>
						<div className="flex-1" />
						<button type="button" onClick={() => { setSelected(new Set()); }} className="text-text-3 hover:underline">Clear</button>
					</div>
				) : null}

				<div className="flex items-center border-b border-border bg-secondary px-4 py-2.5 font-numeric text-[10px] uppercase tracking-[0.06em] text-text-3">
					<div className="w-[22px]" />
					<div className="w-[74px]">Date</div>
					<div className="flex-1">Description</div>
					<div className="hidden w-[130px] md:block">Wallet</div>
					<div className="hidden w-[108px] md:block">Category</div>
					<div className="w-[104px] text-right">Amount</div>
					<div className="hidden w-[104px] text-right md:block">{targetCurrency}</div>
					<div className="w-[26px]" />
				</div>

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
								onSelect={() => { setSelected((prev) => toggle(prev, row.id)); }}
								onExpand={() => { setExpanded((prev) => toggle(prev, row.id)); }}
							/>
						);
					})
				)}

				{!isPending && pageRows.length > 0 && pageRows.length < PAGE_SIZE ? (
					Array.from({ length: PAGE_SIZE - pageRows.length }).map((_, index) => (
						<div key={`pad-${index.toString()}`} aria-hidden="true" className="h-14 border-b border-border last:border-b-0" />
					))
				) : null}

				{!isPending && rows.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-1.5 px-5 py-10 text-center">
						<div className="flex size-[38px] items-center justify-center rounded-[10px] border border-dashed border-border-strong text-[17px] text-text-3">⌕</div>
						<div className="text-[13.5px] font-semibold text-text-2">No matching transactions</div>
						<div className="text-xs text-text-3">Try a different search or clear your filters.</div>
					</div>
				) : null}

				{!isPending && rows.length > 0 ? (
					<div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 text-xs text-text-3">
						{hasFilters ? (
							<span>Showing <b className="text-text-2">{rangeStart}–{rangeEnd}</b> of {rows.length} filtered · {transactions.length} total</span>
						) : (
							<span>Showing <b className="text-text-2">{rangeStart}–{rangeEnd}</b> of {transactions.length}</span>
						)}
						<div className="flex-1" />
						{pageCount > 1 ? (
							<div className="flex items-center gap-1">
								<PageButton disabled={currentPage === 1} onClick={() => { setPage(currentPage - 1); }}>‹</PageButton>
								{buildPages(currentPage, pageCount).map((entry, index) => (
									entry === 'gap' ? (
										<span key={`gap-${index.toString()}`} className="px-1 text-text-3">…</span>
									) : (
										<PageButton key={entry} active={entry === currentPage} onClick={() => { setPage(entry); }}>{entry}</PageButton>
									)
								))}
								<PageButton disabled={currentPage === pageCount} onClick={() => { setPage(currentPage + 1); }}>›</PageButton>
							</div>
						) : null}
					</div>
				) : null}
			</FinanceCard>
		</section>
	);
};

interface TransactionRowProps {
	row: TransactionRowView;
	amountOriginal: string;
	amountMain: string;
	converted: boolean;
	selected: boolean;
	expanded: boolean;
	onSelect: () => void;
	onExpand: () => void;
}

// Original and converted amounts share one muted accent here so neither competes for attention.
const toneText: Record<TransactionRowView['tone'], string> = {
	pos: 'text-pos',
	neg: 'text-neg',
	neutral: 'text-text-2',
	muted: 'text-text-2',
};

const RowAmount: FC<{ original: string; main: string; converted: boolean; tone: TransactionRowView['tone'] }> = ({ original, main, converted, tone }) => (
	<div className={cn("flex flex-col items-end font-numeric text-[12px] leading-tight", toneText[tone])}>
		<span>{original}</span>
		{converted ? <span>{main}</span> : null}
	</div>
);

const TransactionRow: FC<TransactionRowProps> = ({ row, amountOriginal, amountMain, converted, selected, expanded, onSelect, onExpand }) => {
	const totalDebit = row.lines.find((line) => line.type === 'DR')?.amount ?? amountOriginal;
	return (
		<div className="border-b border-border last:border-b-0">
			<div onClick={onExpand} className="flex h-14 cursor-pointer items-center px-4 hover:bg-secondary">
				<div className="w-[22px]">
					<button
						type="button"
						onClick={(event) => { event.stopPropagation(); onSelect(); }}
						className={cn(
							"flex size-4 flex-none items-center justify-center rounded-[5px] border-[1.5px]",
							selected ? "border-primary bg-primary text-white" : "border-border-strong"
						)}
					>
						{selected ? (
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12" />
							</svg>
						) : null}
					</button>
				</div>
				<div className="w-[74px] font-numeric">
					<div className="text-xs">{row.date}</div>
					<div className="text-[10px] text-text-3">{row.time}</div>
				</div>
				<div className="flex min-w-0 flex-1 items-center gap-2.5">
					<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${row.iconClass}`}>{row.icon}</div>
					<div className="min-w-0">
						<div className="truncate text-[13.5px] font-semibold">{row.kind}</div>
					</div>
				</div>
				<div className="hidden w-[130px] text-[12.5px] text-text-2 md:block">{row.walletName}</div>
				<div className="hidden w-[108px] md:block">
					<FinanceBadge tone="neutral" appearance="outline" size="sm">{row.category}</FinanceBadge>
				</div>
				<div className={cn("w-[104px] text-right font-numeric text-[12px]", toneText[row.tone])}>{amountOriginal}</div>
					<div className="hidden w-[104px] text-right font-numeric text-[12px] md:block">
						{converted ? <span className={toneText[row.tone]}>{amountMain}</span> : <span className="text-text-3">—</span>}
					</div>
				<div className="w-[26px] text-right">
					<span className={cn("inline-block text-[11px] text-text-3 transition-transform", expanded && "rotate-180")}>▾</span>
				</div>
			</div>
			{expanded ? (
				<div className="max-w-[600px] py-1 pl-[52px] pr-4 pb-4">
					<div className="mb-3 flex items-center gap-2">
						<span className="font-numeric text-[9.5px] tracking-[0.12em] text-text-3">DERIVED JOURNAL POSTING</span>
						<FinanceBadge tone="neutral" appearance="outline" size="sm">TODO backend</FinanceBadge>
						<div className="flex-1" />
						<span className="flex items-center gap-1 text-[10.5px] font-semibold text-pos">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							balanced · {totalDebit}
						</span>
					</div>
					<div className="flex items-center gap-2.5 rounded-[9px] border border-border-strong bg-card px-3 py-2.5">
						<div className={`flex size-7 flex-none items-center justify-center rounded-[7px] ${row.iconClass}`}>{row.icon}</div>
						<div className="min-w-0 flex-1">
							<div className="truncate text-[12.5px] font-semibold">{row.walletName}</div>
							<div className="font-numeric text-[9px] tracking-[0.08em] text-text-3">TRANSACTION · {row.kind}</div>
						</div>
						<RowAmount original={amountOriginal} main={amountMain} converted={converted} tone={row.tone} />
					</div>
					{row.lines.map((line, index) => (
						<div key={`${row.id}-${line.account}-${index.toString()}`} className="ml-[17px] mt-2 flex items-center gap-2.5 rounded-[9px] border border-border bg-card px-3 py-2.5">
							<FinanceBadge tone={line.type === 'DR' ? 'accent' : 'viol'} appearance="soft" size="sm">{line.type}</FinanceBadge>
							<span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">{line.account}</span>
							<span className="font-numeric text-[9px] uppercase tracking-[0.06em] text-text-3">{line.side}</span>
							<span className="min-w-16 text-right font-display text-[13px] font-semibold">{line.amount}</span>
						</div>
					))}
					<div className="mt-3 font-numeric text-[10.5px] text-text-3">{row.provenance}</div>
				</div>
			) : null}
		</div>
	);
};

TransactionsSection.displayName = 'TransactionsSection';

export { TransactionsSection };
export type { TransactionsSectionProps };
