import { useCallback, useMemo, useState } from "react";

import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import type { TransactionEntryValues } from "../types.ts";


const useEntryFormState = <T extends TransactionEntryValues & FieldValues>(
	form: UseFormReturn<T>,
) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { formState, resetField } = form;

	const canSubmit = useMemo(() => {
		return !(loading || formState.disabled || formState.isSubmitting || !formState.isValid);
	}, [loading, formState.disabled, formState.isSubmitting, formState.isValid]);

	const handleDoneLoading = useCallback(() => {
		setLoading(false);
		resetField('amount' as FieldPath<T>);
		resetField('receiveAmount' as FieldPath<T>);
	}, [resetField]);

	const handleFailedLoading = useCallback(() => {
		setLoading(false);
	}, []);

	const handleLoading = useCallback(() => {
		setLoading(true);
	}, []);

	return {
		canSubmit,
		loading,
		methods: {
			handleDoneLoading,
			handleFailedLoading,
			handleLoading,
		}
	};
}

export { useEntryFormState };
