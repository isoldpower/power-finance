import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toWalletSelectOptions } from "@entity/wallets";
import { useCrossCurrencyTransfer } from "../form-state/use-cross-currency-transfer.ts";
import { useEntryFormState } from "../form-state/use-entry-form-state.ts";
import { usePristineReset } from "../form-state/use-pristine-reset.ts";
import { DEFAULT_ENTRY_CURRENCY } from "../config.ts";
import { fundGoalSchema } from "./fund-goal-schema.ts";
import { useFundGoalInitials } from "./use-fund-goal-initials.ts";

import type { UseFormReturn } from "react-hook-form";
import type { Goal, Wallet, WalletSelectItem } from "@entity/wallets";
import type { UseEntryFormStateReturn } from "../form-state/use-entry-form-state.ts";
import type { FundGoalSchema } from "./fund-goal-schema.ts";


interface UseFundGoalFormParams {
	goal: Goal;
	wallets: Wallet[];
}

interface UseFundGoalFormReturn {
	form: UseFormReturn<FundGoalSchema>;
	walletOptions: WalletSelectItem[];
	fromCurrency: string;
	toCurrency: string;
	convertsCurrency: boolean;
	handleSentChange: (value: string) => void;
	handleReceivedChange: (value: string) => void;
	state: UseEntryFormStateReturn;
}

const useFundGoalForm = ({ goal, wallets }: UseFundGoalFormParams): UseFundGoalFormReturn => {
	const defaultValues = useFundGoalInitials(goal, wallets);
	const form = useForm<FundGoalSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(fundGoalSchema),
	});

	const walletOptions = useMemo(() => toWalletSelectOptions(wallets), [wallets]);
	const fromWallet = useWatch({ control: form.control, name: 'fromWallet' });

	const fromCurrency = useMemo(() => {
		const source = walletOptions.find((option) => option.id === fromWallet);

		return source?.currency ?? DEFAULT_ENTRY_CURRENCY;
	}, [walletOptions, fromWallet]);
	const toCurrency = goal.target.currency;

	const state = useEntryFormState(form);
	const { handleSentChange, handleReceivedChange } = useCrossCurrencyTransfer(
		fromCurrency,
		toCurrency,
		form,
	);
	usePristineReset(defaultValues, form);

	return {
		form,
		walletOptions,
		fromCurrency,
		toCurrency,
		convertsCurrency: fromCurrency !== toCurrency,
		handleSentChange,
		handleReceivedChange,
		state,
	};
};

export { useFundGoalForm };
export type { UseFundGoalFormParams, UseFundGoalFormReturn };
