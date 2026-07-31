import { useMemo } from "react";
import { useWatch } from "react-hook-form";

import type { Control, FieldValues, UseFormReturn } from "react-hook-form";
import type { WalletSelectOption } from "@entity/wallets";
import type { TransactionEntryValues } from "./types.ts";


const useEntryWalletOptions = <T extends TransactionEntryValues & FieldValues>(
	walletOptions: WalletSelectOption[],
	form: UseFormReturn<T>,
) => {
	const control = form.control as unknown as Control<TransactionEntryValues>;
	const type = useWatch({ control, name: 'type' });
	const fromWallet = useWatch({ control, name: 'fromWallet' });
	const toWallet = useWatch({ control, name: 'toWallet' });

	const fromOptions = useMemo(() => {
		if (type !== 'transfer') return walletOptions;

		return walletOptions.filter((option) => option.id !== toWallet);
	}, [type, toWallet, walletOptions]);

	const toOptions = useMemo(() => {
		if (type !== 'transfer') return walletOptions;

		return walletOptions.filter((option) => option.id !== fromWallet);
	}, [type, fromWallet, walletOptions]);

	return {
		fromOptions,
		toOptions,
	};
}

export { useEntryWalletOptions };
