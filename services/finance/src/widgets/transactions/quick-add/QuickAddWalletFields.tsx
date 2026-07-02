import type { FC } from "react";

import { WalletSelect } from "@entity/wallets";
import { FromIcon, ToIcon } from "@entity/transactions";
import type { WalletSelectOption } from "@entity/wallets";


interface QuickAddWalletFieldsProps {
	isTransfer: boolean;
	walletOptions: WalletSelectOption[];
	walletId: string;
	toWalletId: string;
	onWalletChange: (id: string) => void;
	onToWalletChange: (id: string) => void;
}

const QuickAddWalletFields: FC<QuickAddWalletFieldsProps> = ({
	isTransfer,
	walletOptions,
	walletId,
	toWalletId,
	onWalletChange,
	onToWalletChange,
}) => {
	if (!isTransfer) {
		return (
			<WalletSelect 
				options={walletOptions}
				value={walletId}
				onChange={onWalletChange}
				emptyLabel="No wallets yet" 
			/>
		);
	}

	return (
		<>
			<WalletSelect
				showSwatch={false}
				leadingIcon={<FromIcon className="flex-none text-text-3" />}
				options={walletOptions}
				value={walletId}
				onChange={onWalletChange}
				emptyLabel="No wallets yet"
			/>
			<WalletSelect
				showSwatch={false}
				leadingIcon={<ToIcon className="flex-none text-text-3" />}
				options={walletOptions.filter((option) => option.id !== walletId)}
				value={toWalletId}
				onChange={onToWalletChange}
				emptyLabel="Add another wallet"
				className="mt-2"
			/>
		</>
	);
};

QuickAddWalletFields.displayName = 'QuickAddWalletFields';

export { QuickAddWalletFields };
export type { QuickAddWalletFieldsProps };
