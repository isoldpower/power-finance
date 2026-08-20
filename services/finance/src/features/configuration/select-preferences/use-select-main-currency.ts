import { useCallback, useMemo } from "react";
import { useSettingsContext } from "@internal/shared";
import { useUpdatePreferences } from "../data-presenters";


interface UseSelectMainCurrencyReturn {
	onSelect: (code: string) => void;
	isSaving: boolean;
}

const useSelectMainCurrency = (): UseSelectMainCurrencyReturn => {
	const { onUpdateField } = useSettingsContext();
	const { mutate, isPending } = useUpdatePreferences();

	const onSelect = useCallback((code: string) => {
		if (!code) return;

		onUpdateField('mainCurrency', code);
		mutate({ mainCurrency: code });
	}, [mutate, onUpdateField]);

	return useMemo(() => ({
		onSelect,
		isSaving: isPending,
	}), [onSelect, isPending]);
};

export { useSelectMainCurrency };
export type { UseSelectMainCurrencyReturn };
