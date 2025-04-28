import {FC, useState} from "react";
import {BalanceSummary} from "@widget/wallet";
import {OpenTransactionModal} from "@feature/wallet/open-transaction-modal/OpenTransactionModal.tsx";
import {NewTransactionForm} from "@widget/wallet/new-transaction-form/NewTransactionForm.tsx";
import { DialogHeader, DialogTitle, Icons, Button } from "@internal/ui-library";
import {Link} from "@tanstack/react-router";
import {getFinanceRoute} from "@internal/shared";
import { useWallets } from "@feature/wallet";
import WalletCard from "@widget/wallet/wallet-card/WalletCard.tsx";
import {EmptyWalletsExternal} from "@widget/wallet/wallets-not-found/EmptyWalletsExternal.tsx";

const DashboardPage: FC = () => {
	const { wallets, query: { isLoading } } = useWallets();
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
						<OpenTransactionModal
							newTransactionOpen={transactionOpen}
							setNewTransactionOpen={setTransactionOpen}
						>
							<DialogHeader>
								<DialogTitle>
									Add Transaction
								</DialogTitle>
							</DialogHeader>
							<NewTransactionForm onClose={() => setTransactionOpen(false)} />
						</OpenTransactionModal>
					</div>
				</div>
			</div>
			<div className="mb-8">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-900">
						Your Wallets <span className="text-gray-400">({wallets.length})</span>
					</h2>
					<Button variant="link" asChild>
						<Link to={getFinanceRoute('wallets')} className="text-sm flex items-center">
							View all
							<Icons.ChevronRight size={16} className="ml-1" />
						</Link>
					</Button>
				</div>

				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
						{[1, 2, 3].map((i) => (
							<div key={i} className="bg-gray-100 h-32 rounded-lg"></div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{wallets.slice(0, 3).map((wallet) => (
							<WalletCard wallet={wallet} key={wallet.id} />
						))}
						{wallets.length === 0 && <EmptyWalletsExternal />}
					</div>
				)}
			</div>
		</div>
	);
};

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;