import { useState } from 'react';
import type { FC } from 'react';

import { useWalletSelection, useWalletsList } from "@feature/wallet";
import {
	OpenTransactionCreation,
	OpenTransactionFilters
} from "@feature/transaction";
import {
	NewTransactionForm,
	RecentTransaction,
	OverviewTransactionsList,
	WalletSelectionList,
	TransactionFiltersModal
} from "@widget/transaction";


const TransactionsPage: FC = () => {
	const { wallets } = useWalletsList();
	const { selected } = useWalletSelection({ searchKey: 'selectedWallet' });
	const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Transactions
					</h1>
					<p className="text-gray-500">
						View and manage your financial activity
					</p>
				</div>
				<div className="flex space-x-3">
					<OpenTransactionFilters
						isModalOpen={isFilterModalOpen}
						setIsModalOpen={setIsFilterModalOpen}
					>
						<TransactionFiltersModal
							wallets={wallets}
							onClose={() => setIsFilterModalOpen(false)} />
					</OpenTransactionFilters>
					<OpenTransactionCreation
						isModalOpen={newTransactionModalOpen}
						setIsModalOpen={setNewTransactionModalOpen}
						className="text-black"
					>
						<NewTransactionForm
							wallets={wallets}
							onClose={() => setNewTransactionModalOpen(false)} />
					</OpenTransactionCreation>
				</div>
			</div>
			<WalletSelectionList wallets={wallets} />
			<OverviewTransactionsList selectedWallet={selected}>
				<RecentTransaction transaction={null} selectedWallet={selected} />
			</OverviewTransactionsList>
		</div>
	);
};

export { TransactionsPage };
export default TransactionsPage;