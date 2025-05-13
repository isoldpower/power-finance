import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useTransactionsListMethods } from "@feature/transaction";
import { buildCreateData } from "./lib/buildCreateData.ts";
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

	const onSubmit = useCallback(async (data: TransactionSchema) => {
		let createData: TransactionValuableFields;
		switch (data.type) {
			case 'transfer':
				createData = await buildCreateData(wallets, data, true);
				break;
			default:
				createData = await buildCreateData(wallets, data);
				break;
		}

		createTransaction(createData);
		if(onSuccess) onSuccess(data);
	}, [wallets, createTransaction, onSuccess]);

	const handleSubmitForm = useCallback((
		e: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(onSubmit)(e).catch(console.error);
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	);
};
NewTransaction.displayName = 'NewTransaction';

export { NewTransaction };
export type { NewTransactionProps };