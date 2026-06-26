import type { FC } from "react";
import { useState } from "react";
import { cn, FinanceCard, FinanceMoney, FinanceBadge } from "@internal/ui-library";

import { SectionHeader } from "./SectionHeader.tsx";
import { MOCK_ACCOUNT_CATEGORIES, MOCK_ACCOUNT_HISTORY } from "./mock.ts";

const ChartOfAccountsSection: FC = () => {
	const [categoryId, setCategoryId] = useState(MOCK_ACCOUNT_CATEGORIES[0].id);
	const category = MOCK_ACCOUNT_CATEGORIES.find((entry) => entry.id === categoryId) ?? MOCK_ACCOUNT_CATEGORIES[0];
	const [accountId, setAccountId] = useState(category.accounts[0].id);
	const account = category.accounts.find((entry) => entry.id === accountId) ?? category.accounts[0];

	const selectCategory = (id: string) => {
		setCategoryId(id);
		const next = MOCK_ACCOUNT_CATEGORIES.find((entry) => entry.id === id);
		if (next) setAccountId(next.accounts[0].id);
	};

	const accountCount = MOCK_ACCOUNT_CATEGORIES.reduce((sum, entry) => sum + entry.accounts.length, 0);

	return (
		<section>
			<SectionHeader
				title={
					<span className="flex items-center gap-2.5">
						Chart of accounts
						<FinanceBadge tone="neutral" appearance="outline" size="sm">🔒 Read-only</FinanceBadge>
					</span>
				}
				action={<span className="font-numeric text-[10.5px] tracking-[0.08em] text-text-3">{accountCount} ACCOUNTS</span>}
			/>

			<div className="mx-0.5 mb-3.5 flex items-center gap-2.5 rounded-[var(--radius-md)] border border-border border-l-[3px] border-l-text-3 bg-secondary px-3.5 py-2.5">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
					<rect x="3" y="11" width="18" height="11" rx="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</svg>
				<span className="text-[12.5px] leading-snug text-text-2">
					Balances here are <b className="text-foreground">posted automatically</b> from your transactions — this view can’t be edited directly. To change a balance, edit the underlying transaction.
				</span>
			</div>

			<FinanceCard className="mb-4 overflow-hidden">
				<div className="flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3.5">
					<span className="text-sm font-semibold">Balance composition</span>
					<FinanceBadge tone="pos" appearance="soft" dot>Assets = Liabilities + Equity</FinanceBadge>
					<div className="flex-1" />
					<span className="hidden font-numeric text-[10px] text-text-3 sm:block">select a category to drill in</span>
				</div>
				<div className="px-[18px] pb-3.5 pt-2">
					{MOCK_ACCOUNT_CATEGORIES.map((entry) => (
						<div
							key={entry.id}
							onClick={() => { selectCategory(entry.id); }}
							className={cn(
								"-mx-2 cursor-pointer rounded-[var(--radius-md)] px-2 py-2 hover:bg-secondary",
								entry.id === categoryId && "bg-secondary"
							)}
						>
							<div className="mb-1.5 flex items-center gap-2.5">
								<span className="size-[9px] flex-none rounded-[2px]" style={{ background: entry.color }} />
								<span className="text-[13px] font-semibold">{entry.label}</span>
								<div className="flex-1" />
								<FinanceMoney size="sm">{entry.total}</FinanceMoney>
								<span className="text-[11px] text-text-3">›</span>
							</div>
							<div className="flex h-6 w-full items-stretch gap-0.5 rounded-[6px] bg-secondary">
								{entry.segments.map((segment) => (
									<div
										key={segment.account}
										title={segment.account}
										className="h-full min-w-[7px] rounded-[3px]"
										style={{ width: segment.width, background: segment.color }}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</FinanceCard>

			<div className="mx-0.5 mb-2.5 flex items-center gap-2.5">
				<span className="font-numeric text-[10px] uppercase tracking-[0.12em] text-text-3">Drill-down</span>
				<span className="text-[12.5px] text-text-3">{category.label} → account → history</span>
				<div className="h-px flex-1 bg-border" />
			</div>

			<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[320px_1fr]">
				<FinanceCard className="overflow-hidden">
					<div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
						<span className="size-[9px] flex-none rounded-[2px]" style={{ background: category.color }} />
						<span className="flex-1 text-sm font-semibold">{category.label}</span>
						<span className="font-numeric text-[10px] text-text-3">tap to view history</span>
					</div>
					<div className="h-[270px] overflow-y-auto">
						{category.accounts.map((entry) => (
							<div
								key={entry.id}
								onClick={() => { setAccountId(entry.id); }}
								className={cn(
									"flex cursor-pointer items-center gap-2.5 border-b border-border px-4 py-3 hover:bg-secondary",
									entry.id === accountId && "bg-[var(--accent-soft)]"
								)}
							>
								<span className="size-2 flex-none rounded-[2px]" style={{ background: category.color }} />
								<div className="min-w-0 flex-1">
									<div className="truncate text-[13px] font-semibold">{entry.name}</div>
									<div className="text-[10.5px] text-text-3">{entry.kind}</div>
								</div>
								<FinanceMoney tone={entry.balanceTone} size="sm">{entry.balance}</FinanceMoney>
							</div>
						))}
					</div>
				</FinanceCard>

				<FinanceCard className="overflow-hidden">
					<div className="relative overflow-hidden border-b border-border px-6 py-5">
						<div className="pointer-events-none absolute -right-10 -top-[60px] size-[200px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)]" />
						<div className="relative flex items-start gap-3.5">
							<div className="min-w-0 flex-1">
								<div className="mb-0.5 flex items-center gap-2.5">
									<span className="font-display text-[19px] font-semibold tracking-[-0.01em]">{account.name}</span>
									<span className="rounded-[4px] border border-border bg-secondary px-1.5 py-0.5 font-numeric text-[9.5px] font-bold uppercase tracking-[0.04em] text-text-2">{account.accountType}</span>
								</div>
								<div className="text-[12.5px] text-text-3">{account.kind}</div>
							</div>
							<div className="flex-none text-right">
								<div className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">Balance</div>
								<FinanceMoney tone={account.balanceTone} size="xl">{account.balance}</FinanceMoney>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3">
						<span className="text-[13.5px] font-semibold">Transaction history</span>
						<FinanceBadge tone="neutral" appearance="outline" size="sm">{MOCK_ACCOUNT_HISTORY.length} ENTRIES</FinanceBadge>
						<div className="flex-1" />
						<span className="hidden font-numeric text-[10px] text-text-3 sm:block">postings that hit this account</span>
					</div>
					{MOCK_ACCOUNT_HISTORY.map((entry) => (
						<div key={entry.id} className="flex items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary">
							<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${entry.iconClass}`}>{entry.icon}</div>
							<div className="min-w-0 flex-1">
								<div className="truncate text-[13px] font-semibold">{entry.description}</div>
								<div className="font-numeric text-[10.5px] text-text-3">{entry.date}</div>
							</div>
							<FinanceBadge tone={entry.sideTone === 'pos' ? 'pos' : 'neg'} appearance="soft" size="sm">{entry.side}</FinanceBadge>
							<FinanceMoney tone={entry.amountTone} size="sm" className="min-w-[78px] text-right">{entry.amount}</FinanceMoney>
						</div>
					))}
				</FinanceCard>
			</div>
		</section>
	);
};

ChartOfAccountsSection.displayName = 'ChartOfAccountsSection';

export { ChartOfAccountsSection };
