import type { ReactNode } from "react";
import type { FieldValues, UseFormHandleSubmit } from "react-hook-form";

interface NewTransactionProps<T extends FieldValues> {
	handleSubmit: UseFormHandleSubmit<T>;
	onSuccess?: (data: T) => void;
	children?: ReactNode;
}

function NewTransaction<T extends FieldValues>({
	handleSubmit,
	onSuccess,
	children
}: NewTransactionProps<T>) {
	const onSubmit = async (data: T) => {
		console.log('Form submitted', data);
		onSuccess && onSuccess(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children}
		</form>
	)
}

NewTransaction.displayName = 'NewTransaction';

export { NewTransaction };
export type { NewTransactionProps };