import {
	AccountHistoryRow,
	AccountListItem,
	AccountSummary,
	CategoryPanel,
	categoryColor,
	accountAmountTone,
	ledgerIconClass,
	ledgerSideTone,
	HistoryToolbar,
} from "@entity/accounts";
import { Caption, Heading, MetaText, Overline, RowTitle } from "@shared/pure-components/typography";
import { SidebarColumnsContainer } from "@shared/pure-components/layout";

import type { FC } from "react";
import type { AccountHistoryView, AccountView, AccountCategoryView } from "@entity/accounts";


interface AccountsDrillDownProps {
	category: AccountCategoryView;
	account: AccountView;
	accountId: string;
	setAccountId: (id: string) => void;
	history: AccountHistoryView[];
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
					<MetaText as="span" size="10">
						tap to view history
					</MetaText>
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
								<RowTitle size="13" truncate>
									{entry.name}
								</RowTitle>
								<Caption size="10.5">
									{entry.kind}
								</Caption>
							</div>
							<AccountListItem.Balance tone={accountAmountTone(entry.balanceUsd)}>
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
								<Heading as="h3" size="19">
									{account.name}
								</Heading>
								<AccountSummary.Type>
									{account.accountType}
								</AccountSummary.Type>
							</AccountSummary.NameRow>
							<Caption>
								{account.kind}
							</Caption>
						</div>
						<div className="flex-none text-right">
							<Overline size="10" tracking="0.1em">
								Balance
							</Overline>
							<AccountSummary.Balance tone={accountAmountTone(account.balanceUsd)}>
								{convertToUserCurrency(account.balanceUsd)}
							</AccountSummary.Balance>
						</div>
					</AccountSummary.HeroRow>
				</AccountSummary.Hero>
				<HistoryToolbar.Container>
					<RowTitle as="h4">
						Transaction history
					</RowTitle>
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
						<AccountHistoryRow.Icon className={ledgerIconClass(entry.amountUsd)}>
							{entry.icon}
						</AccountHistoryRow.Icon>
						<div className="min-w-0 flex-1">
							<RowTitle size="13" truncate>
								{entry.description}
							</RowTitle>
							<MetaText as="div" size="10.5">
								{entry.date}
							</MetaText>
						</div>
						<AccountHistoryRow.Badge sideTone={ledgerSideTone(entry.side)}>
							{entry.side}
						</AccountHistoryRow.Badge>
						<AccountHistoryRow.Value tone={accountAmountTone(entry.amountUsd)}>
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
