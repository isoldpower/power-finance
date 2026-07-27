import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { NEW_WALLET_GRADIENT } from "@entity/wallets";
import { useWalletsListMethods } from "@feature/wallets/data-presenters/use-wallets-list-methods.ts";
import type { WalletEntrySchema } from "./schemas.ts";

const CREDIT_TYPE = 'Credit card';

interface CreateWalletFormProps {
	handleSubmit: UseFormHandleSubmit<WalletEntrySchema>;
	onSuccess?: () => void;
	children?: ReactNode;
}

function CreateWalletForm({ handleSubmit, onSuccess, children }: CreateWalletFormProps) {
	const { meta } = useWalletsListMethods();

	const onSubmit = useCallback((data: WalletEntrySchema) => {
		meta.createMutation.mutate(
			{
				data: {
					name: data.name.trim(),
					color: NEW_WALLET_GRADIENT,
					balance: { amount: parseFloat(data.balance) || 0, currency: data.currency },
					credit: data.type === CREDIT_TYPE,
				},
			},
			{ onSuccess }
		);
	}, [meta, onSuccess]);

	const handleSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
		handleSubmit(onSubmit)(e).catch(console.error);
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm} className="flex flex-1 flex-col overflow-hidden">
			{children}
		</form>
	);
}

CreateWalletForm.displayName = 'CreateWalletForm';

export { CreateWalletForm };
export type { CreateWalletFormProps };
