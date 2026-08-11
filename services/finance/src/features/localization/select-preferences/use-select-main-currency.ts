import { useCallback } from "react";
import { useSettingsContext } from "@internal/shared";


const useSelectMainCurrency = () => {
	const { onUpdateField } = useSettingsContext();

	return useCallback((code: string) => {
		if (code) onUpdateField('mainCurrency', code);
	}, [onUpdateField]);
};

export { useSelectMainCurrency };
