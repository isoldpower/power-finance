import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWalletMethods } from "@feature/wallets/data-presenters/use-wallet-methods.ts";
import type { PanelWallet } from "../types.ts";
import type { WalletEntrySchema } from "./schemas.ts";

const CREDIT_TYPE = 'Credit card';

interface EditWalletFormProps {
	wallet: PanelWallet;
	handleSubmit: UseFormHandleSubmit<WalletEntrySchema>;
	onSuccess?: () => void;
	children?: ReactNode;
}

function EditWalletForm({ wallet, handleSubmit, onSuccess, children }: EditWalletFormProps) {
	const { updateWallet } = useWalletMethods(wallet.id);

	const onSubmit = useCallback((data: WalletEntrySchema) => {
		updateWallet({
			name: data.name.trim(),
			balance: { amount: wallet.balance.amount, currency: data.currency },
			credit: data.type === CREDIT_TYPE,
		})
			.then(() => { onSuccess?.(); })
			.catch((error: unknown) => { console.error(error); });
	}, [updateWallet, wallet.balance.amount, onSuccess]);

	const handleSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
		handleSubmit(onSubmit)(e).catch(console.error);
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm} className="flex flex-1 flex-col overflow-hidden">
			{children}
		</form>
	);
}

EditWalletForm.displayName = 'EditWalletForm';

export { EditWalletForm };
export type { EditWalletFormProps };
