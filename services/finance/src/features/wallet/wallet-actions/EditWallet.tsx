import { useCallback, useEffect } from "react";
import type { ReactNode, FormEvent } from "react";
import type { UseFormReturn } from "react-hook-form";

import { useWalletMethods } from "@feature/wallet";
import { useEditDefaultValues } from "./useSchemaDefaults.ts";
import type { Wallet } from "@entity/wallet";
import type { WalletSchema } from "./schemas.ts";


interface EditWalletProps {
	form: UseFormReturn<WalletSchema>;
	wallet: Wallet;
	onSuccess?: (data: WalletSchema) => void;
	children?: ReactNode;
}

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
	}, [defaults, reset]);
	
	const onSubmit = useCallback((data: WalletSchema) => {
		const { type, ...rest } = data;
		const walletData = { reversed: type === 'credit', ...rest };

		updateWallet(walletData);
		if (onSuccess) onSuccess(data);
		reset();
	}, [onSuccess, reset, updateWallet]);

	const handleSubmitForm = useCallback((
		e: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(onSubmit)(e)
			.catch((e: unknown) => {
				console.error(e)
			});
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	);
}

EditWallet.displayName = 'EditWallet';

export { EditWallet };
export type { EditWalletProps };