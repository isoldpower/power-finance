import { useState } from "react";
import type { FC } from "react";

import {
	BalanceSummary,
	NewTransactionForm,
	EditableWalletCard,
	PreviewWalletsList,
	WalletsListNavigationHeader
} from "@widget/wallet";
import { useWalletsList } from "@feature/wallet";
import { OpenTransactionCreation } from "@feature/transaction";

const DashboardPage: FC = () => {
	const { wallets } = useWalletsList({ refetchOnMount: true, refetchOnReconnect: true });
	const [transactionOpen, setTransactionOpen] = useState(false);

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-gray-500">Welcome to your financial overview</p>
			</div>
			<div className="bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-xl shadow-lg mb-8 p-6 text-white">
				<div className="md:flex md:justify-between md:items-center">
					<BalanceSummary />
					<div className="mt-4 md:mt-0">
						<OpenTransactionCreation
							newTransactionOpen={transactionOpen}
							setNewTransactionOpen={setTransactionOpen}
						>
							<NewTransactionForm
								wallets={wallets}
								onClose={() => setTransactionOpen(false)} />
						</OpenTransactionCreation>
					</div>
				</div>
			</div>
			<div className="mb-8">
				<WalletsListNavigationHeader />
				<PreviewWalletsList>
					<EditableWalletCard wallet={null}/>
				</PreviewWalletsList>
			</div>
		</div>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;