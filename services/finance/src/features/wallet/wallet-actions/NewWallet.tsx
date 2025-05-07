import {ReactNode, useCallback} from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWalletsListMethods } from "@feature/wallet";
import type { WalletSchema } from "@feature/wallet";


interface NewWalletProps {
	handleSubmit: UseFormHandleSubmit<WalletSchema>;
	onSuccess?: (values: WalletSchema) => void;
	children?: ReactNode;
}

function NewWallet({
	handleSubmit,
	onSuccess,
	children,
}: NewWalletProps) {
	const { createWallet } = useWalletsListMethods();

	const onSubmit = useCallback((data: WalletSchema) => {
		const { type, ...rest } = data;
		const walletData = { reversed: type === 'credit', ...rest };

		createWallet(walletData);
		if (onSuccess) onSuccess(data);
	}, [createWallet, onSuccess]);

	return (
		<form onSubmit={() => handleSubmit(onSubmit)}>
			{children}
		</form>
	)
}

NewWallet.displayName = 'NewWallet';

export { NewWallet };
export type { NewWalletProps };