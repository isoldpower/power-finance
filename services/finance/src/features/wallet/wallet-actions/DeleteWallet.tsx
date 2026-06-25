import { useCallback, useEffect } from "react";
import type { ReactNode, FormEvent } from "react";
import type { UseFormReturn } from "react-hook-form";

import { DeleteWalletSchema, useWalletMethods } from "@feature/wallet";
import { useDeleteDefaultValues } from "./useSchemaDefaults.ts";
import type { Wallet } from "@entity/wallet";


interface DeleteWalletProps {
	form: UseFormReturn<DeleteWalletSchema>;
	wallet: Wallet;
	onSuccess?: (data: DeleteWalletSchema) => void;
	children?: ReactNode;
}

function DeleteWallet({
	onSuccess,
	children,
	form: { handleSubmit, reset },
	wallet
}: DeleteWalletProps) {
	const { deleteWallet } = useWalletMethods(wallet.id);
	const defaults = useDeleteDefaultValues(wallet);

	useEffect(() => {
		reset(defaults);
	}, [defaults, reset]);

	const onSubmit = useCallback(async (data: DeleteWalletSchema) => {
		if (data.id !== wallet.id) {
			return;
		}
		
		const response = await deleteWallet();
		if (response.success) {
			if (onSuccess) onSuccess(data);
			
			reset();
		}
	}, [wallet.id, deleteWallet, onSuccess, reset]);

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

DeleteWallet.displayName = 'DeleteWallet';

export { DeleteWallet };
export type { DeleteWalletProps };
