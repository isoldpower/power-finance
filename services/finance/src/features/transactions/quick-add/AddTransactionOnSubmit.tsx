import { FC, type FormEvent, type ReactNode, useCallback } from "react";

import { useTransactionsListMethods } from "../data-presenters";
import type { CreateTransactionChainResponse, CreateTransactionResponse } from "../transactions-api";
import type { QuickAddSchema } from "./quick-add-schema.ts";
import { buildTransferChain } from "../transaction-actions";
import type { UseFormHandleSubmit } from "react-hook-form";


interface AddTransactionOnSubmitProps {
	handleSubmit: UseFormHandleSubmit<QuickAddSchema>;
	children?: ReactNode;
	onBeforeEdit?: () => void;
	onSuccess?: (result: CreateTransactionResponse | CreateTransactionChainResponse) => void;
	onError?: (error: unknown) => void;
}

const AddTransactionOnSubmit: FC<AddTransactionOnSubmitProps> = ({
	handleSubmit,
	onSuccess,
	onBeforeEdit,
	onError,
	children,
}) => {
	const { createTransaction, createTransactionChain } = useTransactionsListMethods();

	const onSubmit = useCallback(async (data: QuickAddSchema) => {
		const numeric = Math.abs(parseFloat(data.amount));
		const value = numeric.toFixed(2);

		if (data.type === 'income' && data.toWallet) {
			return await createTransaction({
				source_wallet_id: data.toWallet,
				amount: value,
			});
		} else if (data.type === 'expense' && data.fromWallet) {
			return await createTransaction({
				source_wallet_id: data.fromWallet,
				amount: `-${value}`,
			});
		} else if (data.type === 'transfer' && data.toWallet && data.fromWallet) {
			const received = Math.abs(parseFloat(data.receiveAmount));

			return await createTransactionChain({
				transactions: buildTransferChain(data.fromWallet, data.toWallet, numeric, received),
			});
		}

		throw new Error(`Unknown quick add form type or fields not fulfilled: ${data.type}`);
	}, [createTransaction, createTransactionChain]);

	const wrappedOnSubmit = useCallback(async (data: QuickAddSchema) => {
		if (onBeforeEdit) onBeforeEdit();
		try {
			const payload = await onSubmit(data);
			if (onSuccess) onSuccess(payload);
		} catch (error: unknown) {
			console.error(error);
			if (onError) onError(error);
		}
	}, [onBeforeEdit, onSubmit, onSuccess, onError]);

	const handleSubmitForm = useCallback((
		e: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(wrappedOnSubmit)(e).catch(console.error);
	}, [handleSubmit, wrappedOnSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	);
}

AddTransactionOnSubmit.displayName = 'AddTransactionOnSubmit';

export { AddTransactionOnSubmit };
export type { AddTransactionOnSubmitProps };
