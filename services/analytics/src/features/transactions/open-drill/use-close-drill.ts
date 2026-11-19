import { useAnalyticsFilters } from "@feature/filters";


const useCloseDrill = (): (() => void) => {
	return useAnalyticsFilters((state) => state.closeDrill);
};

export { useCloseDrill };
