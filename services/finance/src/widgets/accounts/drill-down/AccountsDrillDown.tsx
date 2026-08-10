import {
	AccountHistoryRow,
	AccountListItem,
	AccountSummary,
	CategoryPanel,
	categoryColor,
	HistoryToolbar,
} from "@entity/accounts";
import { SidebarColumnsContainer } from "@shared/components";

import type { FC } from "react";
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
		<SidebarColumnsContainer sidebar="start" sidebarWidth="320px" from="md">
			<CategoryPanel.Card>
				<CategoryPanel.Header>
					<CategoryPanel.Swatch color={categoryColor(category.id)} />
					<CategoryPanel.Title>
						{category.label}
					</CategoryPanel.Title>
					<CategoryPanel.Hint>
						tap to view history
					</CategoryPanel.Hint>
				</CategoryPanel.Header>
				<CategoryPanel.List>
					{category.accounts.map((entry) => (
						<AccountListItem.Container
							key={entry.id}
							active={entry.id === accountId}
							onClick={() => { setAccountId(entry.id); }}
						>
							<AccountListItem.Swatch color={categoryColor(category.id)} />
							<div className="min-w-0 flex-1">
								<AccountListItem.Name>
									{entry.name}
								</AccountListItem.Name>
								<AccountListItem.Kind>
									{entry.kind}
								</AccountListItem.Kind>
							</div>
							<AccountListItem.Balance tone={entry.balanceTone}>
								{convertToUserCurrency(entry.balanceUsd)}
							</AccountListItem.Balance>
						</AccountListItem.Container>
					))}
				</CategoryPanel.List>
			</CategoryPanel.Card>
			<AccountSummary.Card>
				<AccountSummary.Hero>
					<AccountSummary.Glow />
					<AccountSummary.HeroRow>
						<div className="min-w-0 flex-1">
							<AccountSummary.NameRow>
								<AccountSummary.Name>
									{account.name}
								</AccountSummary.Name>
								<AccountSummary.Type>
									{account.accountType}
								</AccountSummary.Type>
							</AccountSummary.NameRow>
							<AccountSummary.Kind>
								{account.kind}
							</AccountSummary.Kind>
						</div>
						<div className="flex-none text-right">
							<AccountSummary.BalanceLabel>
								Balance
							</AccountSummary.BalanceLabel>
							<AccountSummary.Balance tone={account.balanceTone}>
								{convertToUserCurrency(account.balanceUsd)}
							</AccountSummary.Balance>
						</div>
					</AccountSummary.HeroRow>
				</AccountSummary.Hero>
				<HistoryToolbar.Container>
					<HistoryToolbar.Title>
						Transaction history
					</HistoryToolbar.Title>
					<HistoryToolbar.Count>
						{history.length} ENTRIES
					</HistoryToolbar.Count>
					<div className="flex-1" />
					<HistoryToolbar.Hint>
						postings that hit this account
					</HistoryToolbar.Hint>
				</HistoryToolbar.Container>
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
			</AccountSummary.Card>
		</SidebarColumnsContainer>
	);
};

AccountsDrillDown.displayName = 'AccountsDrillDown';

export { AccountsDrillDown };
export type { AccountsDrillDownProps };
