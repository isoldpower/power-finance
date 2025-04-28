import {FC, useState} from 'react';
import {useWallets } from "@feature/wallet";
import WalletCard from "@widget/wallet/wallet-card/WalletCard.tsx";
import {OpenWalletCreation} from "@feature/wallet/open-wallet-creation/OpenWalletCreation.tsx";
import {WalletCreationModal} from "@widget/wallet/wallet-creation-modal/WalletCreationModal.tsx";
import { EmptyWalletsInternal } from '@src/widgets/wallet/wallets-not-found/EmptyWalletsInternal';

const WalletsPage: FC = () => {
	const {
		wallets,
		isMutating,
		query: { isLoading, isPending }
	} = useWallets();

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Wallets</h1>
					<p className="text-gray-500">Manage your accounts and cards</p>
				</div>
				<OpenWalletCreation isAddModalOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
					<WalletCreationModal onClose={() => setIsAddModalOpen(false)} />
				</OpenWalletCreation>
			</div>
			{(isLoading || isMutating || isPending) ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
					{[1, 2, 3].map((i) => (
						<div key={i} className="bg-gray-100 h-32 rounded-lg" />
					))}
				</div>
			) : (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{wallets.map((wallet) => (
						<WalletCard
							key={wallet.id}
							wallet={wallet} />
					))}

					{wallets.length === 0 && (
						<EmptyWalletsInternal openModal={() => setIsAddModalOpen(true)} />
					)}
				</div>
			)}
		</div>
	);
};

export { WalletsPage };
export default WalletsPage;