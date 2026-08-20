import { useCallback, useMemo } from "react";
import { useSettingsContext } from "@internal/shared";
import { useUpdatePreferences } from "../data-presenters";


interface UseSelectTimezoneReturn {
	onSelect: (id: string) => void;
	isSaving: boolean;
}

const useSelectTimezone = (): UseSelectTimezoneReturn => {
	const { onUpdateField } = useSettingsContext();
	const { mutate, isPending } = useUpdatePreferences();

	const onSelect = useCallback((id: string) => {
		if (!id) return;

		onUpdateField('timezone', id);
		mutate({ timezone: id });
	}, [mutate, onUpdateField]);

	return useMemo(() => ({
		onSelect,
		isSaving: isPending,
	}), [onSelect, isPending]);
};

export { useSelectTimezone };
export type { UseSelectTimezoneReturn };
