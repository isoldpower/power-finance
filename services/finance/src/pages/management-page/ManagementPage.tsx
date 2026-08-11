import { ScanReceiptIcon } from "@shared/pure-components/icons";
import type { FC } from "react";

import { AccountsDrillDownDetails, BrowseAccountCategories, LedgerBalanceBand } from "@process/accounts";
import { BrowseTransactionEntries, LedgerBasedTransaction } from "@process/transactions";
import { BrowseAndSelectWallets, SelectedWalletDetails } from "@process/wallets";
import { AccountsBrowserHeader, BalanceCompositionToolbar, CategoryRow } from "@widget/accounts";
import {
	TransactionBrowserProvider,
	TransactionBrowserFilters,
	TransactionsBrowserHeader,
	TransactionsBrowserPagination,
	TransactionsBulkActions,
	TransactionsTableColumns,
} from "@widget/transactions";
import { WalletBrowserProvider, WalletBrowserHeader } from "@widget/wallets";
import { BrowseAccountsContextProvider } from "@feature/accounts";
import { TransactionsSelectionProvider } from "@feature/transactions";
import { WalletsSelectionProvider } from "@feature/wallets";
import { ReadOnlyNotice } from "@entity/accounts";
import { RevealMotion } from "@shared/motion";
import { SlideOver, SlideOverTrigger } from "@shared/overlays";
import { AiBadge } from "@shared/pure-components/badges";
import { Overline, PageTitle } from "@shared/pure-components/typography";
import { CenteredList, PageContainer, SidebarColumnsContainer, SpaceBetween } from "@shared/pure-components/layout";
import { FinanceButton, FinanceCard } from "@internal/ui-library";

import { managementSlides, managementSlidesRegistry } from "./SlideOverRegistry.tsx";


const ManagementPage: FC = () => {
	return (
		<WalletsSelectionProvider>
			<TransactionsSelectionProvider>
				<PageContainer>
					<RevealMotion delay={0.05}>
						<SpaceBetween>
							<CenteredList>
								<PageTitle>
									Management
								</PageTitle>
								<Overline as="span" className="hidden sm:block">
									Wallets · Transactions · Ledger
								</Overline>
							</CenteredList>
							<CenteredList>
								<SlideOverTrigger asChild={true} panelId={managementSlides.scanReceipt}>
									<FinanceButton variant="secondary" className="hidden items-center gap-2 sm:flex">
										<ScanReceiptIcon />
										Scan receipt
										<AiBadge />
									</FinanceButton>
								</SlideOverTrigger>
								<SlideOverTrigger asChild={true} panelId={managementSlides.createTransaction}>
									<FinanceButton variant="primary">
										<div className="hidden items-center gap-2 sm:flex">
											<span>＋</span>
											<span>Add</span>
										</div>
									</FinanceButton>
								</SlideOverTrigger>
							</CenteredList>
						</SpaceBetween>
					</RevealMotion>
					<RevealMotion delay={0.1}>
						<LedgerBalanceBand />
					</RevealMotion>
					<RevealMotion delay={0.18}>
						<WalletBrowserHeader createWalletPanel={managementSlides.createWallet} />
						<SidebarColumnsContainer sidebar="start" sidebarWidth="340px" from="md">
							<WalletBrowserProvider>
								<FinanceCard className="overflow-hidden">
									<BrowseAndSelectWallets />
								</FinanceCard>
								<SelectedWalletDetails
									editWalletPanel={managementSlides.editWallet}
									transferPanel={managementSlides.createTransaction}
								/>
							</WalletBrowserProvider>
						</SidebarColumnsContainer>
					</RevealMotion>
					<RevealMotion delay={0.24}>
						<TransactionBrowserProvider>
							<TransactionsBrowserHeader createTransactionPanel={managementSlides.createTransaction} />
							<FinanceCard className="overflow-visible">
								<TransactionBrowserFilters />
								<TransactionsBulkActions />
								<TransactionsTableColumns />
								<BrowseTransactionEntries>
									{(transaction) => (
										<LedgerBasedTransaction transaction={transaction} />
									)}
								</BrowseTransactionEntries>
								<TransactionsBrowserPagination />
							</FinanceCard>
						</TransactionBrowserProvider>
					</RevealMotion>
					<RevealMotion delay={0.3}>
						<BrowseAccountsContextProvider>
							<AccountsBrowserHeader />
							<ReadOnlyNotice>
								Balances here are
								<b className="text-foreground">&nbsp;posted automatically&nbsp;</b>
								from your transactions — this view can’t be edited directly.
								To change a balance, edit the underlying transaction.
							</ReadOnlyNotice>
							<FinanceCard className="mb-4 overflow-hidden">
								<BalanceCompositionToolbar />
								<BrowseAccountCategories>
									{(category) => (
										<CategoryRow key={category.id} categoryEntry={category} />
									)}
								</BrowseAccountCategories>
							</FinanceCard>
							<AccountsDrillDownDetails />
						</BrowseAccountsContextProvider>
					</RevealMotion>
					<SlideOver panelsRegistry={managementSlidesRegistry} />
				</PageContainer>
			</TransactionsSelectionProvider>
		</WalletsSelectionProvider>
	);
};

ManagementPage.displayName = 'ManagementPage';

export { ManagementPage };
