import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useTransactionsListMethods } from "@feature/transaction";
import { buildCreateData } from "./buildCreateData.ts";
import type { TransactionMinimalPayload } from "@feature/transaction";
import type { TransactionSchema } from "./schemas.ts";


interface NewTransactionProps {
	handleSubmit: UseFormHandleSubmit<TransactionSchema>;
	onSuccess?: (data: TransactionSchema) => void;
	children?: ReactNode;
}

function NewTransaction({
	handleSubmit,
	onSuccess,
	children,
}: NewTransactionProps) {
	const { createTransaction } = useTransactionsListMethods();

	const onSubmit = useCallback((data: TransactionSchema) => {
		const createData: TransactionMinimalPayload = buildCreateData(data);

		createTransaction(createData);
		if(onSuccess) onSuccess(data);
	}, [createTransaction, onSuccess]);

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