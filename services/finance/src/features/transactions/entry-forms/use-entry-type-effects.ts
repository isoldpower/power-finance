import { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";

import type { Control, FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import type { TransactionEntryValues } from "./types.ts";


const useEntryTypeEffects = <T extends TransactionEntryValues & FieldValues>(
	defaultValues: T,
	form: UseFormReturn<T>,
) => {
	const { reset, resetField, formState, trigger } = form;
	const type = useWatch({
		control: form.control as unknown as Control<TransactionEntryValues>,
		name: 'type'
	});

	const previousType = useRef(type);

	useEffect(() => {
		if (previousType.current === type) return;
		previousType.current = type;

		resetField('fromWallet' as FieldPath<T>);
		resetField('toWallet' as FieldPath<T>);
		void trigger();
	}, [type, resetField, trigger]);

	useEffect(() => {
		if (formState.isDirty) return;

		reset(defaultValues);
	}, [defaultValues, formState.isDirty, reset]);
}

export { useEntryTypeEffects };
