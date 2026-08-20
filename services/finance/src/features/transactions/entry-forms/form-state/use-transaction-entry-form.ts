import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCrossCurrencyTransfer } from "./use-cross-currency-transfer.ts";
import { useEntryFormState } from "./use-entry-form-state.ts";
import { useEntryTypeEffects } from "./use-entry-type-effects.ts";
import { useEntryWalletOptions } from "./use-entry-wallet-options.ts";
import { useWalletsCurrencies } from "./use-wallets-currencies.ts";

import type { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import type { ZodType } from "zod";
import type { Wallet, WalletSelectItem } from "@entity/wallets";
import type { TransactionEntryType } from "@entity/transactions";
import type { TransactionEntryValues } from "../types.ts";
import type { UseEntryFormStateReturn } from "./use-entry-form-state.ts";


interface UseTransactionEntryFormParams<T extends TransactionEntryValues & FieldValues> {
	schema: ZodType<T>;
	defaultValues: T;
	wallets: Wallet[];
}

interface UseTransactionEntryFormReturn<T extends TransactionEntryValues & FieldValues> {
	form: UseFormReturn<T>;
	type: TransactionEntryType;
	currency: string;
	fromCurrency: string;
	toCurrency: string;
	fromOptions: WalletSelectItem[];
	toOptions: WalletSelectItem[];
	handleSentChange: (value: string) => void;
	handleReceivedChange: (value: string) => void;
	state: UseEntryFormStateReturn;
}

const useTransactionEntryForm = <T extends TransactionEntryValues & FieldValues>({
	schema,
	defaultValues,
	wallets,
}: UseTransactionEntryFormParams<T>): UseTransactionEntryFormReturn<T> => {
	const form = useForm<T>({
		defaultValues: defaultValues as DefaultValues<T>,
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	const { currency, fromCurrency, toCurrency, type } = useWalletsCurrencies(wallets, form);
	const state = useEntryFormState(form);
	const { fromOptions, toOptions } = useEntryWalletOptions(wallets, form);
	const { handleSentChange, handleReceivedChange } = useCrossCurrencyTransfer(
		fromCurrency,
		toCurrency,
		form,
	);
	useEntryTypeEffects(defaultValues, form);

	return {
		form,
		type,
		currency,
		fromCurrency,
		toCurrency,
		fromOptions,
		toOptions,
		handleSentChange,
		handleReceivedChange,
		state,
	};
};

export { useTransactionEntryForm };
export type { UseTransactionEntryFormParams, UseTransactionEntryFormReturn };
