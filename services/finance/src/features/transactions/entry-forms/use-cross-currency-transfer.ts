import { useCallback, useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";

import { useCurrencyPairRate } from "@feature/localization";

import type { Control, FieldValues, UseFormReturn } from "react-hook-form";
import type { TransactionEntryValues } from "./types.ts";


interface UseCrossCurrencyTransferReturn {
	handleSentChange: (value: string) => void;
	handleReceivedChange: (value: string) => void;
}

const useCrossCurrencyTransfer = <T extends TransactionEntryValues & FieldValues>(
	fromCurrency: string,
	toCurrency: string,
	form: UseFormReturn<T>,
): UseCrossCurrencyTransferReturn => {
	const { rate } = useCurrencyPairRate(fromCurrency, toCurrency);
	const { getValues, setValue } = form as unknown as UseFormReturn<TransactionEntryValues>;
	const type = useWatch({
		control: form.control as unknown as Control<TransactionEntryValues>,
		name: 'type'
	});
	const lastEditedSide = useRef<'sent' | 'received'>('sent');

	const scaleAmount = useCallback((value: string, factor: number): string => {
		const numericValue = parseFloat(value);
		const scaledValue = numericValue * factor;
		if (!Number.isFinite(scaledValue)) {
			return '';
		}

		return scaledValue.toFixed(2);
	}, []);

	const handleSentChange = useCallback((value: string) => {
		lastEditedSide.current = 'sent';
		setValue('amount', value, { shouldValidate: true, shouldDirty: true });
		setValue('receiveAmount', scaleAmount(value, rate), { shouldValidate: true });
	}, [setValue, scaleAmount, rate]);

	const handleReceivedChange = useCallback((value: string) => {
		lastEditedSide.current = 'received';
		setValue('receiveAmount', value, { shouldValidate: true, shouldDirty: true });
		setValue('amount', scaleAmount(value, 1 / rate), { shouldValidate: true });
	}, [setValue, scaleAmount, rate]);

	useEffect(() => {
		if (type !== 'transfer') return;

		const values = getValues();
		if (lastEditedSide.current === 'received') {
			setValue('amount', scaleAmount(values.receiveAmount, 1 / rate), { shouldValidate: true });
			return;
		}

		setValue('receiveAmount', scaleAmount(values.amount, rate), { shouldValidate: true });
	}, [rate, type, getValues, setValue, scaleAmount]);

	return { handleSentChange, handleReceivedChange };
}

export { useCrossCurrencyTransfer };
export type { UseCrossCurrencyTransferReturn };
