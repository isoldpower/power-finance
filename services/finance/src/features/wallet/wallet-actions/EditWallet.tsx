import {ReactNode, useEffect, useMemo} from "react";
import type { UseFormReturn } from "react-hook-form";

import { useWalletMethods } from "@feature/wallet";
import type { Wallet } from "@entity/wallet";
import type { EditSchema } from "./schemas.ts";


interface EditWalletProps {
	form: UseFormReturn<EditSchema>;
	wallet: Wallet;
	onSuccess?: (data: EditSchema) => void;
	children?: ReactNode;
}

const useEditDefaultValues = (wallet: Wallet): EditSchema => {
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

	const onSubmit = async (data: EditSchema) => {
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