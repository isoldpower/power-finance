import { useCallback } from "react";
import { useSettingsContext } from "@internal/shared";


const useSelectLocale = () => {
	const { onUpdateField } = useSettingsContext();

	return useCallback((tag: string) => {
		if (tag) onUpdateField('locale', tag);
	}, [onUpdateField]);
};

export { useSelectLocale };
