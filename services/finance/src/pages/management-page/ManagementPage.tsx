import type { FC } from "react";

import {
	SlideOver,
	AiBadge,
	CenteredList,
	MainPageTitle,
	PageDescription,
	SpaceOccupant,
	SlideOverTrigger,
} from "@shared/components";
import { RevealMotion } from "@shared/interactions";
import { ScanReceiptIcon } from "@entity/transactions";
import {managementSlides, managementSlidesRegistry} from "./slide-over-registry";
import {FinanceButton, FinanceCard} from "@internal/ui-library";
import {LedgerBalanceBand} from "@process/metrics/ledger-status/LedgerBalanceBand.tsx";
import {WalletBrowserHeader} from "@widget/wallets/wallet-browser/WalletBrowserHeader.tsx";
import {BrowseAndSelectWallets} from "@process/wallets/browse-wallets/BrowseAndSelectWallets.tsx";
import {BrowserWalletDetails} from "@process/wallets/browse-wallets/BrowserWalletDetails.tsx";
import {WalletBrowserContextProvider} from "@widget/wallets/wallet-browser/WalletBrowserContext.tsx";
import {BrowseTransactionEntries} from "@process/transactions/browse-transactions/BrowseTransactionEntries.tsx";
import {LedgerBasedTransaction} from "@process/transactions/browse-transactions/LedgerBasedTransaction.tsx";
import {
	TransactionBrowserContextProvider
} from "@widget/transactions/transactions-browser/TransactionBrowserContext.tsx";
import {TransactionsBrowserHeader} from "@widget/transactions/transactions-browser/TransactionsBrowserHeader.tsx";
import {TransactionsBrowserPagination} from "@widget/transactions/transactions-browser/TransactionsBrowserPagination.tsx";
import {TransactionBrowserFilters} from "@widget/transactions/transactions-browser/TransactionBrowserFilters.tsx";
import {ReadOnlyNotice} from "@entity/accounts";
import {AccountsBrowserHeader} from "@widget/accounts/accounts-browser/AccountsBrowserHeader.tsx";
import {BalanceCompositionToolbar} from "@widget/accounts/accounts-browser/BalanceCompositionToolbar.tsx";
import {CategoryRow} from "@widget/accounts";
import {BrowseAccountCategories} from "@process/accounts/browse-accounts/BrowseAccountCategories.tsx";
import {AccountsDrillDownDetails} from "@process/accounts/browse-accounts/AccountsDrillDownDetails.tsx";
import {BrowseAccountsContextProvider} from "@feature/accounts/browse-accounts/BrowseAccountsContext.tsx";


const ManagementPage: FC = () => {
	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-[22px] pb-[70px] pt-[22px]">
			<RevealMotion delay={0.05}>
				<CenteredList>
					<MainPageTitle>
						Management
					</MainPageTitle>
					<PageDescription>
						Wallets · Transactions · Ledger
					</PageDescription>
					<SpaceOccupant />
					<SlideOverTrigger asChild={true} panelId={managementSlides.scanReceipt}>
						<FinanceButton variant="secondary">
							<div className="hidden items-center gap-2 sm:flex">
								<ScanReceiptIcon />
								Scan receipt
								<AiBadge />
							</div>
						</FinanceButton>
					</SlideOverTrigger>
					<SlideOverTrigger asChild={true} panelId={managementSlides.createTransaction}>
						<FinanceButton className="shadow-[0_4px_14px_var(--glow)]" variant="primary">
							<div className="hidden items-center gap-2 sm:flex">
								<span>＋</span>
								<span>Add</span>
							</div>
						</FinanceButton>
					</SlideOverTrigger>
				</CenteredList>
			</RevealMotion>
			<RevealMotion delay={0.12}>
				<LedgerBalanceBand />
			</RevealMotion>
			<RevealMotion delay={0.18}>
				<WalletBrowserHeader 
					createWalletPanel={managementSlides.createWallet}
					total={5}
				/>
				<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[340px_1fr]">
					<WalletBrowserContextProvider>
						<FinanceCard className="overflow-hidden">
							<BrowseAndSelectWallets />
						</FinanceCard>
						<BrowserWalletDetails
							editWalletPanel={managementSlides.editWallet}
							transferPanel={managementSlides.createTransaction}
						/>
					</WalletBrowserContextProvider>
				</div>
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
		</div>
	);
};

ManagementPage.displayName = 'ManagementPage';

export { ManagementPage };
export default ManagementPage;
