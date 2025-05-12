import { useState } from "react";
import type { FC } from "react";

import {
	BalanceSummary,
	NewTransactionForm,
	EditableWalletCard,
	PreviewWalletsList,
	WalletsListNavigationHeader
} from "@widget/wallet";
import {useWalletSelection, useWalletsList} from "@feature/wallet";
import { OpenTransactionCreation } from "@feature/transaction";
import {
	TransactionsListNavigationHeader,
	RecentTransactionsList,
	RecentTransaction
} from "@widget/transaction";
import type { Transaction } from "@entity/transaction";
import { Wallet } from "@entity/wallet";


const DashboardPage: FC = () => {
	const { wallets } = useWalletsList();
	const { selected } = useWalletSelection({ searchKey: 'selectedWallet' });
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto flex flex-col gap-8">
			<div>
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<p className="text-gray-500 dark:text-gray-300">Welcome to your financial overview</p>
			</div>
			<div className="bg-gradient-to-r bg-card rounded-xl shadow-sm p-6">
				<div className="md:flex md:justify-between md:items-center">
					<BalanceSummary />
					<div className="mt-4 md:mt-0">
						<OpenTransactionCreation
							setIsModalOpen={setIsNewTransactionModalOpen}
							isModalOpen={isNewTransactionModalOpen}
						>
							<NewTransactionForm
								wallets={wallets}
								onClose={() => { setIsNewTransactionModalOpen(false); }} />
						</OpenTransactionCreation>
					</div>
				</div>
			</div>
			<div>
				<WalletsListNavigationHeader />
				<PreviewWalletsList>
					<EditableWalletCard wallet={{} as Wallet} />
				</PreviewWalletsList>
			</div>
			<div>
				<TransactionsListNavigationHeader />
				<RecentTransactionsList selectedWallet={selected}>
					<RecentTransaction transaction={{} as Transaction} />
				</RecentTransactionsList>
			</div>
		</div>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;