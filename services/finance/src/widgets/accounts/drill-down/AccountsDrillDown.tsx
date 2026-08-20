import { useMemo } from "react";
import {
	AccountHistoryEmpty,
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
import { useAccountHistoryPage, useAccountsConvertion } from "@feature/accounts";
import { Caption, Heading, MetaText, Overline, RowTitle } from "@shared/pure-components/typography";
import { Pagination, PaginationRange, toPageEntries } from "@shared/pure-components/collections";
import { SidebarColumnsContainer } from "@shared/pure-components/layout";
import { ShowOn } from "@shared/visibility";

import type { FC } from "react";
import type { AccountHistoryView, AccountView, AccountCategoryView } from "@entity/accounts";


interface AccountsDrillDownProps {
	category: AccountCategoryView;
	account: AccountView;
	accountId: string;
	setAccountId: (id: string) => void;
	history: AccountHistoryView[];
}

const AccountsDrillDown: FC<AccountsDrillDownProps> = ({
	category,
	account,
	accountId,
	setAccountId,
	history,
}) => {
	const {
		paginatedHistory,
		total,
		pageNumber,
		pageCount,
		from,
		to,
		goToPage
	} = useAccountHistoryPage(history, accountId);
	const { convertToUserCurrency, convertToUserCurrencyWithSign } = useAccountsConvertion();
	
	const pages = useMemo(() => {
		return toPageEntries(pageNumber, pageCount);
	}, [pageCount, pageNumber]);

	return (
		<SidebarColumnsContainer sidebar="start" sidebarWidth="320px" from="md">
			<CategoryPanel>
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
						<AccountListItem
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
									{entry.group}
								</Caption>
							</div>
							<AccountListItem.Balance tone={accountAmountTone(entry.balance.amount)}>
								{convertToUserCurrency(entry.balance)}
							</AccountListItem.Balance>
						</AccountListItem>
					))}
				</CategoryPanel.List>
			</CategoryPanel>
			<AccountSummary>
				<AccountSummary.Hero>
					<AccountSummary.HeroRow>
						<div className="min-w-0 flex-1">
							<AccountSummary.NameRow>
								<Heading as="h3" size="19">
									{account.name}
								</Heading>
								<AccountSummary.Type>
									{account.group}
								</AccountSummary.Type>
							</AccountSummary.NameRow>
						</div>
						<div className="flex-none text-right">
							<Overline size="10" tracking="0.1em">
								Balance
							</Overline>
							<AccountSummary.Balance tone={accountAmountTone(account.balance.amount)}>
								{convertToUserCurrency(account.balance)}
							</AccountSummary.Balance>
						</div>
					</AccountSummary.HeroRow>
				</AccountSummary.Hero>
				<HistoryToolbar>
					<RowTitle as="h4">
						Transaction history
					</RowTitle>
					<HistoryToolbar.Count>
						{total} ENTRIES
					</HistoryToolbar.Count>
					<div className="flex-1" />
					<HistoryToolbar.Hint>
						postings that hit this account
					</HistoryToolbar.Hint>
				</HistoryToolbar>
				<div className="min-h-[270px]">
					<ShowOn condition={total === 0}>
						<AccountHistoryEmpty>
							<AccountHistoryEmpty.Icon>
								∅
							</AccountHistoryEmpty.Icon>
							<RowTitle as="p" tone="muted">
								No transactions yet
							</RowTitle>
							<AccountHistoryEmpty.Message>
								Nothing has posted to {account.name} this period.
								Activity will appear here as it’s recorded.
							</AccountHistoryEmpty.Message>
						</AccountHistoryEmpty>
					</ShowOn>
					{paginatedHistory.map((entry) => (
						<AccountHistoryRow key={entry.id}>
							<AccountHistoryRow.Icon className={ledgerIconClass(entry.amount.amount)}>
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
							<AccountHistoryRow.Badge sideTone={ledgerSideTone(entry.debit)}>
								{entry.debit ? 'DR' : 'CR'}
							</AccountHistoryRow.Badge>
							<AccountHistoryRow.Value tone={accountAmountTone(entry.amount.amount)}>
								{convertToUserCurrencyWithSign(entry.amount)}
							</AccountHistoryRow.Value>
						</AccountHistoryRow>
					))}
				</div>
				<div className="flex h-[50px] items-center gap-2.5 border-t border-border px-[18px]">
					<PaginationRange total={total} from={from} to={to} />
					<div className="flex-1" />
					<ShowOn condition={pageCount > 1}>
						<Pagination
							currentPage={pageNumber}
							pageCount={pageCount}
							pages={pages}
							onPage={goToPage}
						/>
					</ShowOn>
				</div>
			</AccountSummary>
		</SidebarColumnsContainer>
	);
};

AccountsDrillDown.displayName = 'AccountsDrillDown';

export { AccountsDrillDown };
export type { AccountsDrillDownProps };
