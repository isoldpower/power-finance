import { useCallback } from "react";
import { useAnalyticsFilters } from "@feature/filters";


const useOpenDayDrill = (): ((date: string) => void) => {
	const openDrill = useAnalyticsFilters((state) => state.openDrill);

	return useCallback((date: string) => {
		openDrill({ kind: 'day', date });
	}, [openDrill]);
};

export { useOpenDayDrill };
