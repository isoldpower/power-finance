import { useCallback } from "react";
import { useTransactionsListMethods } from "../../data-presenters";
import { submitEntry } from "./submit-entry.ts";

import type { FormEvent, ReactNode } from "react";
import type { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import type { Transaction } from "@entity/transactions";
import type { TransactionEntryValues } from "../types.ts";
import type { EntrySubmitResponse } from "./submit-entry.ts";


interface TransactionEntryOnSubmitProps<T extends TransactionEntryValues & FieldValues> {
	handleSubmit: UseFormHandleSubmit<T>;
	fromCurrency: string;
	toCurrency: string;
	adjusted?: Transaction | null;
	children?: ReactNode;
	className?: string;
	onBeforeEdit?: () => void;
	onSuccess?: (result: EntrySubmitResponse) => void;
	onError?: (error: unknown) => void;
}

function TransactionEntryOnSubmit<T extends TransactionEntryValues & FieldValues>({
	handleSubmit,
	fromCurrency,
	toCurrency,
	adjusted = null,
	children,
	className,
	onBeforeEdit,
	onSuccess,
	onError,
}: TransactionEntryOnSubmitProps<T>) {
	const { createTransaction, createTransactionChain, createAdjustment } = useTransactionsListMethods();

	const wrappedOnSubmit = useCallback(async (data: T) => {
		if (onBeforeEdit) onBeforeEdit();

		try {
			const payload = await submitEntry(
				data,
				{ fromCurrency, toCurrency },
				{ createTransaction, createTransactionChain, createAdjustment },
				adjusted,
			);
			if (onSuccess) onSuccess(payload);
		} catch (error: unknown) {
			console.error(error);
			if (onError) onError(error);
		}
	}, [
		createTransaction,
		createTransactionChain,
		createAdjustment,
		adjusted,
		fromCurrency,
		toCurrency,
		onBeforeEdit,
		onSuccess,
		onError,
	]);

	const handleSubmitForm = useCallback((
		event: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(wrappedOnSubmit)(event).catch(console.error);
	}, [handleSubmit, wrappedOnSubmit]);

	return (
		<form onSubmit={handleSubmitForm} className={className}>
			{children}
		</form>
	);
}

TransactionEntryOnSubmit.displayName = 'TransactionEntryOnSubmit';

export { TransactionEntryOnSubmit };
export type { TransactionEntryOnSubmitProps };
