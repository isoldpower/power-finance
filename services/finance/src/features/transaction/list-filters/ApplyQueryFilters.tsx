import { useCallback } from "react";
import type { FC, FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWalletSelection } from "@feature/wallet";
import type { TransactionFiltersSchema } from "./schemas.ts";
import type { Wallet } from "@entity/wallet";


interface ApplyQueryFiltersProps {
	children: ReactNode;
	handleSubmit: UseFormHandleSubmit<TransactionFiltersSchema>;
	onSuccess?: (data: TransactionFiltersSchema) => void;
	wallets: Wallet[];
}

const ApplyQueryFilters: FC<ApplyQueryFiltersProps> = ({
	handleSubmit,
	onSuccess,
	children
}) => {
	const { setSelected } = useWalletSelection({ searchKey: 'selectedWallet' });

	const onSuccessfulSubmit = useCallback((data: TransactionFiltersSchema) => {
		setSelected(data.selectedWallet);
		onSuccess?.(data);
	}, [onSuccess, setSelected]);

	const handleSubmitForm = useCallback((
		e: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(onSuccessfulSubmit)(e).catch(console.error);
	}, [handleSubmit, onSuccessfulSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	)
}

export { ApplyQueryFilters };