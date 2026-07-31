import { useCallback, useMemo, useState } from "react";

import type { UseFormReturn } from "react-hook-form";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const useWalletFormState = (
	form: UseFormReturn<WalletFormSchema>,
) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { formState } = form;

	const canSubmit = useMemo(() => {
		return !(loading || formState.disabled || formState.isSubmitting || !formState.isValid);
	}, [loading, formState.disabled, formState.isSubmitting, formState.isValid]);

	const handleDoneLoading = useCallback(() => {
		setLoading(false);
	}, []);

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

export { useWalletFormState };
