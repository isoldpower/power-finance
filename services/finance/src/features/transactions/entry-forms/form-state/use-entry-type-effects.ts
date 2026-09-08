import { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";

import { usePristineReset } from "./use-pristine-reset.ts";
import { walletDefaultsFor } from "./use-entry-wallet-defaults.ts";

import type { Control, FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import type { Wallet } from "@entity/wallets";
import type { TransactionEntryValues } from "../types.ts";


interface EntryTypeContext {
	wallets: Wallet[];
	preferredWalletId?: string;
}

const useEntryTypeEffects = <T extends TransactionEntryValues & FieldValues>(
	defaultValues: T,
	form: UseFormReturn<T>,
	context: EntryTypeContext,
) => {
	const { setValue, trigger } = form;
	const type = useWatch({
		control: form.control as unknown as Control<TransactionEntryValues>,
		name: 'type'
	});

	const previousType = useRef(type);
	const { wallets, preferredWalletId } = context;

	useEffect(() => {
		if (previousType.current === type) return;
		previousType.current = type;

		const { fromWallet, toWallet } = walletDefaultsFor(type, wallets, preferredWalletId);

		setValue('fromWallet' as FieldPath<T>, fromWallet as never);
		setValue('toWallet' as FieldPath<T>, toWallet as never);
		void trigger();
	}, [type, wallets, preferredWalletId, setValue, trigger]);

	usePristineReset(defaultValues, form);
}

export { useEntryTypeEffects };
export type { EntryTypeContext };
