import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { resolveTimezone, useSettingsContext } from "@internal/shared";
import { useAnalyticsFilters } from "../filter-store";
import { useActiveRange } from "../active-range";

import type { AnalyticsQuery } from "@entity/filters";


const useAnalyticsQuery = (): AnalyticsQuery => {
	const { mainCurrency, timezone } = useSettingsContext();
	const range = useActiveRange();
	const walletIds = useAnalyticsFilters(useShallow((state) => state.walletIds));

	return useMemo(() => ({
		range,
		currency: mainCurrency,
		timezone: resolveTimezone(timezone),
		walletIds: [...walletIds].sort(),
	}), [range, mainCurrency, timezone, walletIds]);
};

export { useAnalyticsQuery };
