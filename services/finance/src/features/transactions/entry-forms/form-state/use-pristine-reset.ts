import { useEffect } from "react";

import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { TransactionEntryValues } from "../types.ts";


const usePristineReset = <T extends TransactionEntryValues & FieldValues>(
	defaultValues: T,
	form: UseFormReturn<T>,
) => {
	const { formState, reset } = form;

	useEffect(() => {
		if (formState.isDirty) return;

		reset(defaultValues);
	}, [defaultValues, formState.isDirty, reset]);
}

export { usePristineReset };
