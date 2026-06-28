import type { FC } from "react";
import { FinanceCard, FinanceMoney, FinanceBadge } from "@internal/ui-library";

import { useChartOfAccounts } from "@feature/account";
import { SectionHeader } from "@entity/management";
import { CategoryRow, AccountListItem, AccountHistoryRow } from "@entity/account";

interface ChartOfAccountsSectionProps {
	className?: string;
}

const ChartOfAccountsSection: FC<ChartOfAccountsSectionProps> = ({ className }) => {
	const {
		categories,
		history,
		categoryId,
		accountId,
		category,
		account,
		accountCount,
		selectCategory,
		selectSegment,
		setAccountId,
		money,
		signedMoney,
		segmentsFor,
	} = useChartOfAccounts();

	return (
		<section className={className}>
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
					{categories.map((entry) => (
						<CategoryRow
							key={entry.id}
							label={entry.label}
							color={entry.color}
							totalFormatted={money(entry.totalUsd)}
							active={entry.id === categoryId}
							segments={segmentsFor(entry.accounts)}
							isCurrentCategory={entry.id === categoryId}
							selectedAccountId={accountId}
							onSelectCategory={() => { selectCategory(entry.id); }}
							onSelectSegment={(accId) => { selectSegment(entry.id, accId); }}
						/>
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
							<AccountListItem
								key={entry.id}
								name={entry.name}
								kind={entry.kind}
								color={category.color}
								active={entry.id === accountId}
								balanceFormatted={money(entry.balanceUsd)}
								balanceTone={entry.balanceTone}
								onSelect={() => { setAccountId(entry.id); }}
							/>
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
									<span className="rounded-[4px] border border-border bg-secondary px-1.5 py-0.5 font-numeric text-[9.5px] font-semibold uppercase tracking-[0.04em] text-text-2">{account.accountType}</span>
								</div>
								<div className="text-[12.5px] text-text-3">{account.kind}</div>
							</div>
							<div className="flex-none text-right">
								<div className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">Balance</div>
								<FinanceMoney tone={account.balanceTone} size="xl">{money(account.balanceUsd)}</FinanceMoney>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3">
						<span className="text-[13.5px] font-semibold">Transaction history</span>
						<FinanceBadge tone="neutral" appearance="outline" size="sm">{history.length} ENTRIES</FinanceBadge>
						<div className="flex-1" />
						<span className="hidden font-numeric text-[10px] text-text-3 sm:block">postings that hit this account</span>
					</div>
					{history.map((entry) => (
						<AccountHistoryRow
							key={entry.id}
							icon={entry.icon}
							iconClass={entry.iconClass}
							description={entry.description}
							date={entry.date}
							side={entry.side}
							sideTone={entry.sideTone}
							amountFormatted={signedMoney(entry.amountUsd)}
							amountTone={entry.amountTone}
						/>
					))}
				</FinanceCard>
			</div>
		</section>
	);
};

ChartOfAccountsSection.displayName = 'ChartOfAccountsSection';

export { ChartOfAccountsSection };
