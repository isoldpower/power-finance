import type { FC } from "react";
import { FinanceBadge } from "@internal/ui-library";

import { SectionHeader } from "@shared/components";
import { ReadOnlyNotice } from "@entity/accounts";
import {
	calculateAccountsShare,
	useAccountHistory,
	useAccountsCategorySelection,
	useAccountsConvertion,
} from "@feature/accounts";
import { BalanceComposition } from "@widget/accounts/balance-composition/BalanceComposition.tsx";
import { AccountsDrillDown } from "@widget/accounts/drill-down/AccountsDrillDown.tsx";

interface ChartOfAccountsSectionProps {
	className?: string;
}

const ChartOfAccountsSection: FC<ChartOfAccountsSectionProps> = ({ className }) => {
	const {
		categories,
		categoryId,
		accountId,
		category,
		account,
		accountCount,
		selectCategory,
		selectSegment,
		setAccountId,
	} = useAccountsCategorySelection();
	const {
		convertToUserCurrencyWithSign,
		convertToUserCurrency,
	} = useAccountsConvertion();
	const { history } = useAccountHistory();

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
			<ReadOnlyNotice>
				Balances here are 
				<b className="text-foreground">posted automatically</b> 
				from your transactions — this view can’t be edited directly. 
				To change a balance, edit the underlying transaction.
			</ReadOnlyNotice>
			<BalanceComposition
				categories={categories}
				categoryId={categoryId}
				accountId={accountId}
				selectCategory={selectCategory}
				selectSegment={selectSegment}
				convertToUserCurrency={convertToUserCurrency}
				getSegments={calculateAccountsShare}
			/>

			<div className="mx-0.5 mb-2.5 flex items-center gap-2.5">
				<span className="font-numeric text-[10px] uppercase tracking-[0.12em] text-text-3">Drill-down</span>
				<span className="text-[12.5px] text-text-3">{category.label} → account → history</span>
				<div className="h-px flex-1 bg-border" />
			</div>

			<AccountsDrillDown
				category={category}
				account={account}
				accountId={accountId}
				setAccountId={setAccountId}
				history={history}
				convertToUserCurrency={convertToUserCurrency}
				convertToUserCurrencyWithSign={convertToUserCurrencyWithSign}
			/>
		</section>
	);
};

ChartOfAccountsSection.displayName = 'ChartOfAccountsSection';

export { ChartOfAccountsSection };
export type { ChartOfAccountsSectionProps };
