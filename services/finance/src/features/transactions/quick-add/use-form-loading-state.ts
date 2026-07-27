import {useCallback, useMemo, useState} from "react";
import {UseFormReturn} from "react-hook-form";
import {QuickAddSchema} from "@feature/transactions";


const useFormLoadingState = (
	form: UseFormReturn<QuickAddSchema>,
) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { formState, resetField } = form;
	
	const canSubmit = useMemo(() => {
		return !(loading || formState.disabled || formState.isSubmitting || !formState.isValid);
	}, [loading, formState.disabled, formState.isSubmitting, formState.isValid]);

	const handleDoneLoading = useCallback(() => {
		setLoading(false);
		resetField('amount');
		resetField('receiveAmount');
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

export { useFormLoadingState };