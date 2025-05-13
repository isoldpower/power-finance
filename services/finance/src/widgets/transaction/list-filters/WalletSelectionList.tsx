import type { FC } from "react";

import { useWalletSelection } from "@feature/wallet";
import { FilterButton } from "@entity/transaction";
import type { Wallet } from "@entity/wallet";


interface WalletSelectionListProps {
	wallets: Wallet[];
}

const WalletSelectionList: FC<WalletSelectionListProps> = ({ wallets }) => {
	const { selected, setSelected } = useWalletSelection({ searchKey: 'selectedWallet' });

	return (
		<div className="mb-6 flex flex-wrap gap-2">
			<FilterButton
				onClick={() => { setSelected('all'); }}
				selected={!selected}
			>
				All accounts
			</FilterButton>
			{wallets.map(wallet => (
				<FilterButton
					selected={selected === wallet.id}
					key={wallet.id}
					onClick={() => { setSelected(wallet.id); }}
				>
					{wallet.name}
				</FilterButton>
			))}
		</div>
	)
}

export { WalletSelectionList };