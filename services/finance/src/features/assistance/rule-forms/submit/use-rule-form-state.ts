import { useCallback, useState } from "react";


function useRuleFormState() {
	const [loading, setLoading] = useState<boolean>(false);

	const handleLoading = useCallback(() => {
		setLoading(true);
	}, []);

	const handleDoneLoading = useCallback(() => {
		setLoading(false);
	}, []);

	const handleFailedLoading = useCallback(() => {
		setLoading(false);
	}, []);

	return {
		loading,
		methods: {
			handleLoading,
			handleDoneLoading,
			handleFailedLoading,
		},
	};
}

export { useRuleFormState };
