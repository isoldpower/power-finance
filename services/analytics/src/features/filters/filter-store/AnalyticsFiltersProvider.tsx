import { useState } from "react";
import { createAnalyticsFiltersStore } from "./store-partials/store.ts";
import { AnalyticsFiltersContext } from "./store-partials/context.ts";

import type { FC, PropsWithChildren } from "react";
import type { AnalyticsFilters } from "./types.ts";


type AnalyticsFiltersProviderProps = PropsWithChildren<Partial<AnalyticsFilters>>;

const AnalyticsFiltersProvider: FC<AnalyticsFiltersProviderProps> = ({ children, ...initial }) => {
	const [store] = useState(() => createAnalyticsFiltersStore(initial));

	return (
		<AnalyticsFiltersContext value={store}>
			{children}
		</AnalyticsFiltersContext>
	);
};

AnalyticsFiltersProvider.displayName = 'AnalyticsFiltersProvider';

export { AnalyticsFiltersProvider };
export type { AnalyticsFiltersProviderProps };
