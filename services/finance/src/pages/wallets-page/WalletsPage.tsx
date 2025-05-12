import { useState} from 'react';
import type { FC } from 'react';

import { EditableWalletCard, NewWalletForm, FullWalletsList } from "@widget/wallet";
import { OpenWalletCreation } from "@feature/wallet";
import type { Wallet } from "@entity/wallet";


const WalletsPage: FC = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold">Wallets</h1>
					<p className="text-silent">Manage your accounts and cards</p>
				</div>
				<OpenWalletCreation isAddModalOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
					<NewWalletForm onClose={() => { setIsAddModalOpen(false); }} />
				</OpenWalletCreation>
			</div>
			<FullWalletsList onCreate={() => { setIsAddModalOpen(true); }}>
				<EditableWalletCard wallet={{} as Wallet} />
			</FullWalletsList>
		</div>
	);
};

export { WalletsPage };
export default WalletsPage;