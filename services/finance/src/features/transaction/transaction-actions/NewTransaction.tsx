import { useCallback } from "react";
import type { ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useTransactionsListMethods } from "@feature/transaction";
import { useCurrencyRates } from "@shared/external-api";
import type { TransactionValuableFields } from "@feature/transaction";
import type { TransactionSchema } from "./schemas.ts";
import type { Wallet } from "@entity/wallet";

interface NewTransactionProps {
	handleSubmit: UseFormHandleSubmit<TransactionSchema>;
	onSuccess?: (data: TransactionSchema) => void;
	children?: ReactNode;
	wallets: Wallet[]
}

function NewTransaction({
	handleSubmit,
	onSuccess,
	children,
	wallets
}: NewTransactionProps) {
	const { createTransaction } = useTransactionsListMethods();
	const { convertFromTo } = useCurrencyRates();

	const buildTransferData = useCallback(async (
		data: TransactionSchema
	) => {
		const targetCurrency = data.targetCurrency;
		const fromWallet = wallets.find((wallet) => wallet.id === data.from);
		const toWallet = wallets.find((wallet) => wallet.id === data.to);
		if (!fromWallet || !toWallet || !targetCurrency) {
			throw new Error('Invalid wallets');
		}

		const fromWalletValue = convertFromTo(data.amount, targetCurrency, fromWallet.currency);
		const toWalletValue = convertFromTo(data.amount, targetCurrency, toWallet.currency);
		const resolvedValues = await Promise.all([fromWalletValue, toWalletValue]);
		return {
			description: data.description,
			from: data.from ? { wallet: data.from, amount: resolvedValues[0] } : undefined,
			to: data.to ? { wallet: data.to, amount: resolvedValues[1] } : undefined,
			type: data.type as TransactionValuableFields['type']
		} satisfies TransactionValuableFields;
	}, [convertFromTo, wallets]);

	const buildGenericData = useCallback(async (
		data: TransactionSchema
	) => {
		const targetCurrency = data.targetCurrency;
		const fromWallet = wallets.find((wallet) => wallet.id === data.from);
		const toWallet = wallets.find((wallet) => wallet.id === data.to);
		const targetWallet = fromWallet ?? toWallet;

		if (!targetWallet || !targetCurrency) throw new Error('Invalid wallet values');
		const resolvedValue = await convertFromTo(
			data.amount,
			targetCurrency,
			targetWallet.currency
		);

		return {
			description: data.description,
			to: targetWallet.id === data.to ? { wallet: data.to, amount: resolvedValue } : undefined,
			from: targetWallet.id === data.from ? { wallet: data.from, amount: resolvedValue } : undefined,
			type: data.type as TransactionValuableFields['type']
		} satisfies TransactionValuableFields;
	}, [convertFromTo, wallets]);

	const onSubmit = useCallback(async (data: TransactionSchema) => {
		const createData = data.type === 'transfer'
			? await buildTransferData(data)
			: await buildGenericData(data);

		createTransaction(createData)
		onSuccess && onSuccess(data);
	}, [createTransaction, convertFromTo, onSuccess]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children}
		</form>
	)
}

NewTransaction.displayName = 'NewTransaction';

export { NewTransaction };
export type { NewTransactionProps };