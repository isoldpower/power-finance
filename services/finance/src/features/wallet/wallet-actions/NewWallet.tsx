import type { ReactNode } from "react";
import type {FieldValues, UseFormHandleSubmit} from "react-hook-form";
import { useWalletsListMethods, WalletValuableFields } from "@feature/wallet";

interface NewWalletProps<T extends FieldValues> {
	handleSubmit: UseFormHandleSubmit<T>;
	onSuccess?: (values: T) => void;
	children?: ReactNode;
	mutate: (values: T) => WalletValuableFields;
}

function NewWallet<T extends FieldValues>({
	handleSubmit,
	onSuccess,
	children,
	mutate
}: NewWalletProps<T>) {
	const { createWallet } = useWalletsListMethods();
	const onSubmit = async (data: T) => {
		const mutatedData = mutate(data);

		createWallet(mutatedData);
		onSuccess && onSuccess(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children}
		</form>
	)
}

NewWallet.displayName = 'NewWallet';

export { NewWallet };
export type { NewWalletProps };