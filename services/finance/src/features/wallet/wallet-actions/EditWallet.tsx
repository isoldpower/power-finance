import {ReactNode, useEffect, useMemo} from "react";
import type { UseFormReturn } from "react-hook-form";

import { useWalletMethods } from "@feature/wallet";
import type { Wallet } from "@entity/wallet";
import type { WalletSchema } from "./schemas.ts";


interface EditWalletProps {
	form: UseFormReturn<WalletSchema>;
	wallet: Wallet;
	onSuccess?: (data: WalletSchema) => void;
	children?: ReactNode;
}

const useEditDefaultValues = (wallet: Wallet): WalletSchema => {
	return useMemo(() => ({
		name: wallet.name,
		type: wallet.reversed ? 'credit' : 'debit',
		balance: wallet.balance,
		currency: wallet.currency,
	}), [wallet])
};

function EditWallet({
	onSuccess,
	children,
	form: { handleSubmit, reset },
	wallet
}: EditWalletProps) {
	const { updateWallet } = useWalletMethods(wallet.id);
	const defaults = useEditDefaultValues(wallet);

	useEffect(() => {
		reset(defaults);
	}, [defaults]);

	const onSubmit = async (data: WalletSchema) => {
		const { type, ...rest } = data;
		const walletData = { reversed: type === 'credit', ...rest };

		updateWallet(walletData);
		onSuccess && onSuccess(data);
		reset();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children}
		</form>
	)
}

EditWallet.displayName = 'EditWallet';

export { EditWallet, useEditDefaultValues };
export type { EditWalletProps };