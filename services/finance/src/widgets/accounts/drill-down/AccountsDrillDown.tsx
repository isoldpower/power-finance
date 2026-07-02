import type { FC } from "react";
import { FinanceCard, FinanceMoney, FinanceBadge } from "@internal/ui-library";

import { AccountListItem, AccountHistoryRow, categoryColor } from "@entity/accounts";
import type { AccountHistoryEntry, MockAccount, MockAccountCategory } from "@feature/accounts";


interface AccountsDrillDownProps {
	category: MockAccountCategory;
	account: MockAccount;
	accountId: string;
	setAccountId: (id: string) => void;
	history: AccountHistoryEntry[];
	convertToUserCurrency: (value: number) => string;
	convertToUserCurrencyWithSign: (value: number) => string;
}

const AccountsDrillDown: FC<AccountsDrillDownProps> = ({
	category,
	account,
	accountId,
	setAccountId,
	history,
	convertToUserCurrency,
	convertToUserCurrencyWithSign,
}) => {
	return (
		<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[320px_1fr]">
			<FinanceCard className="overflow-hidden">
				<div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
					<span 
						className="size-[9px] flex-none rounded-[2px]" 
						style={{ background: categoryColor(category.id) }} 
					/>
					<span className="flex-1 text-sm font-semibold">
						{category.label}
					</span>
					<span className="font-numeric text-[10px] text-text-3">
						tap to view history
					</span>
				</div>
				<div className="h-[270px] overflow-y-auto">
					{category.accounts.map((entry) => (
						<AccountListItem
							key={entry.id}
							name={entry.name}
							kind={entry.kind}
							color={categoryColor(category.id)}
							active={entry.id === accountId}
							balanceFormatted={convertToUserCurrency(entry.balanceUsd)}
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
								<span className="font-display text-[19px] font-semibold tracking-[-0.01em]">
									{account.name}
								</span>
								<span className="rounded-[4px] border border-border bg-secondary px-1.5 py-0.5 font-numeric text-[9.5px] font-semibold uppercase tracking-[0.04em] text-text-2">{account.accountType}</span>
							</div>
							<div className="text-[12.5px] text-text-3">{account.kind}</div>
						</div>
						<div className="flex-none text-right">
							<div className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">
								Balance
							</div>
							<FinanceMoney tone={account.balanceTone} size="xl">
								{convertToUserCurrency(account.balanceUsd)}
							</FinanceMoney>
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
					<AccountHistoryRow key={entry.id}>
						<AccountHistoryRow.Icon className={entry.iconClass}>
							{entry.icon}
						</AccountHistoryRow.Icon>
						<div className="min-w-0 flex-1">
							<AccountHistoryRow.Description>
								{entry.description}
							</AccountHistoryRow.Description>
							<AccountHistoryRow.Date>
								{entry.date}
							</AccountHistoryRow.Date>
						</div>
						<AccountHistoryRow.Badge sideTone={entry.sideTone}>
							{entry.side}
						</AccountHistoryRow.Badge>
						<AccountHistoryRow.Value tone={entry.amountTone}>
							{convertToUserCurrencyWithSign(entry.amountUsd)}
						</AccountHistoryRow.Value>
					</AccountHistoryRow>
				))}
			</FinanceCard>
		</div>
	);
};

AccountsDrillDown.displayName = 'AccountsDrillDown';

export { AccountsDrillDown };
export type { AccountsDrillDownProps };
