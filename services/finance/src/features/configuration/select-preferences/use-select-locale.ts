import { useCallback, useMemo } from "react";
import { useSettingsContext } from "@internal/shared";
import { useUpdatePreferences } from "../data-presenters";


interface UseSelectLocaleReturn {
	onSelect: (tag: string) => void;
	isSaving: boolean;
}

const useSelectLocale = (): UseSelectLocaleReturn => {
	const { onUpdateField } = useSettingsContext();
	const { mutate, isPending } = useUpdatePreferences();

	const onSelect = useCallback((tag: string) => {
		if (!tag) return;

		onUpdateField('locale', tag);
		mutate({ locale: tag });
	}, [mutate, onUpdateField]);

	return useMemo(() => ({
		onSelect,
		isSaving: isPending,
	}), [onSelect, isPending]);
};

export { useSelectLocale };
export type { UseSelectLocaleReturn };
