import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useTransactionsListMethods } from "../data-presenters";
import type { TransferSchema } from "./schemas.ts";

interface TransferFormProps {
	handleSubmit: UseFormHandleSubmit<TransferSchema>;
	onSuccess?: () => void;
	children?: ReactNode;
}

function TransferForm({ handleSubmit, onSuccess, children }: TransferFormProps) {
	const { meta } = useTransactionsListMethods();

	const onSubmit = useCallback((data: TransferSchema) => {
		const numeric = parseFloat(data.amount);
		if (Number.isNaN(numeric) || numeric <= 0) return;
		if (data.fromId === '' || data.toId === '' || data.toId === data.fromId) return;
		const abs = Math.abs(numeric).toFixed(2);

		Promise.all([
			meta.createMutation.mutateAsync({ data: { source_wallet_id: data.fromId, amount: `-${abs}` } }),
			meta.createMutation.mutateAsync({ data: { source_wallet_id: data.toId, amount: abs } }),
		])
			.then(() => { onSuccess?.(); })
			.catch((error: unknown) => { console.error(error); });
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

TransferForm.displayName = 'TransferForm';

export { TransferForm };
export type { TransferFormProps };
