import type { FC } from "react";

import { AccountsDrillDownDetails, BrowseAccountCategories, LedgerBalanceBand } from "@process/accounts";
import { BrowseTransactionEntries, LedgerBasedTransaction } from "@process/transactions";
import { BrowseAndSelectWallets, BrowserWalletDetails } from "@process/wallets";
import { AccountsBrowserHeader, BalanceCompositionToolbar, CategoryRow } from "@widget/accounts";
import {
	TransactionBrowserContextProvider,
	TransactionBrowserFilters,
	TransactionsBrowserHeader,
	TransactionsBrowserPagination,
} from "@widget/transactions";
import { WalletBrowserContextProvider, WalletBrowserHeader } from "@widget/wallets";
import { BrowseAccountsContextProvider } from "@feature/accounts";
import { ReadOnlyNotice } from "@entity/accounts";
import { ScanReceiptIcon } from "@entity/transactions";
import { RevealMotion } from "@shared/interactions";
import {
	SlideOver,
	AiBadge,
	MainPageTitle,
	PageDescription,
	SlideOverTrigger,
	PageContainer,
	SpaceBetween,
	CenteredList,
	SidebarColumnsContainer,
} from "@shared/components";
import { FinanceButton, FinanceCard } from "@internal/ui-library";

import { managementSlides, managementSlidesRegistry } from "./slide-over-registry";


const ManagementPage: FC = () => {
	return (
		<PageContainer>
			<RevealMotion delay={0.05}>
				<SpaceBetween>
					<CenteredList>
						<MainPageTitle>
							Management
						</MainPageTitle>
						<PageDescription>
							Wallets · Transactions · Ledger
						</PageDescription>
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
				<WalletBrowserHeader createWalletPanel={managementSlides.createWallet} total={5} />
				<SidebarColumnsContainer sidebar="start" sidebarWidth="340px" from="md">
					<WalletBrowserContextProvider>
						<FinanceCard className="overflow-hidden">
							<BrowseAndSelectWallets />
						</FinanceCard>
						<BrowserWalletDetails
							editWalletPanel={managementSlides.editWallet}
							transferPanel={managementSlides.createTransaction}
						/>
					</WalletBrowserContextProvider>
				</SidebarColumnsContainer>
			</RevealMotion>
			<RevealMotion delay={0.24}>
				<TransactionBrowserContextProvider>
					<TransactionsBrowserHeader createTransactionPanel={managementSlides.createTransaction} />
					<FinanceCard className="overflow-hidden">
						<TransactionBrowserFilters />
						<BrowseTransactionEntries>
							{(transaction) => (
								<LedgerBasedTransaction transaction={transaction} />
							)}
						</BrowseTransactionEntries>
						<TransactionsBrowserPagination />
					</FinanceCard>
				</TransactionBrowserContextProvider>
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
	);
};

ManagementPage.displayName = 'ManagementPage';

export { ManagementPage };
export default ManagementPage;
