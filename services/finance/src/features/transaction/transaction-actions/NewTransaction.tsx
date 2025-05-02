import { useCallback } from "react";
import type { ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useTransactionsListMethods } from "@feature/transaction";
import type { TransactionValuableFields } from "@feature/transaction";
import type { TransactionSchema } from "./schemas.ts";

interface NewTransactionProps {
	handleSubmit: UseFormHandleSubmit<TransactionSchema>;
	onSuccess?: (data: TransactionSchema) => void;
	children?: ReactNode;
}

function NewTransaction({
	handleSubmit,
	onSuccess,
	children
}: NewTransactionProps) {
	const { createTransaction } = useTransactionsListMethods();

	const onSubmit = useCallback(async (data: TransactionSchema) => {
		const createData = {
			data,
			type: data.type as TransactionValuableFields['type']
		} satisfies TransactionValuableFields;

		createTransaction(createData)
		onSuccess && onSuccess(data);
	}, [createTransaction, onSuccess]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children}
		</form>
	)
}

NewTransaction.displayName = 'NewTransaction';

export { NewTransaction };
export type { NewTransactionProps };