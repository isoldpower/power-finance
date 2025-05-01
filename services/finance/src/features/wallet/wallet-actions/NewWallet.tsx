import {ReactNode, useCallback} from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWalletsListMethods } from "@feature/wallet";
import { useSettingsContext } from "@internal/shared";
import type { WalletSchema } from "@feature/wallet";


interface NewWalletProps {
	handleSubmit: UseFormHandleSubmit<WalletSchema>;
	onSuccess?: (values: WalletSchema) => void;
	children?: ReactNode;
}

const useNewDefaultValues = (): WalletSchema => {
	const { mainCurrency } = useSettingsContext();

	return {
		name: '',
		balance: 0,
		currency: mainCurrency,
		type: 'debit'
	};
}

function NewWallet({
	handleSubmit,
	onSuccess,
	children,
}: NewWalletProps) {
	const { createWallet } = useWalletsListMethods();

	const onSubmit = useCallback(async (data: WalletSchema) => {
		const { type, ...rest } = data;
		const walletData = { reversed: type === 'credit', ...rest };

		createWallet(walletData);
		onSuccess && onSuccess(data);
	}, [createWallet, onSuccess]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children}
		</form>
	)
}

NewWallet.displayName = 'NewWallet';

export { NewWallet, useNewDefaultValues };
export type { NewWalletProps };