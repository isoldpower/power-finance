import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useTransactionsListMethods } from "../data-presenters";
import type { AddTransactionSchema } from "./schemas.ts";


interface AddTransactionFormProps {
	handleSubmit: UseFormHandleSubmit<AddTransactionSchema>;
	onSuccess?: () => void;
	children?: ReactNode;
}

function AddTransactionForm({ handleSubmit, onSuccess, children }: AddTransactionFormProps) {
	const { meta } = useTransactionsListMethods();

	const onSubmit = useCallback((data: AddTransactionSchema) => {
		const numeric = parseFloat(data.amount);
		if (Number.isNaN(numeric) || numeric <= 0 || data.fromId === '') return;
		const abs = Math.abs(numeric).toFixed(2);

		if (data.type === 'transfer') {
			if (data.toId === '' || data.toId === data.fromId) return;
			Promise.all([
				meta.createMutation.mutateAsync({ data: { source_wallet_id: data.fromId, amount: `-${abs}` } }),
				meta.createMutation.mutateAsync({ data: { source_wallet_id: data.toId, amount: abs } }),
			]).then(() => { onSuccess?.(); }).catch((error: unknown) => { console.error(error); });
			return;
		}

		const signed = data.type === 'income' ? abs : `-${abs}`;
		meta.createMutation.mutate(
			{ data: { source_wallet_id: data.fromId, amount: signed } },
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

AddTransactionForm.displayName = 'AddTransactionForm';

export { AddTransactionForm };
export type { AddTransactionFormProps };
