import { useAnalyticsFilters } from "@feature/filters";

import type { FC, ReactNode } from "react";
import type { Drill } from "@entity/filters";


interface ShowOnDrillOpenProps {
	children: (drill: Drill) => ReactNode;
}

const ShowOnDrillOpen: FC<ShowOnDrillOpenProps> = ({ children }) => {
	const drill = useAnalyticsFilters((state) => state.drill);

	if (!drill) {
		return null;
	}

	return children(drill);
};

ShowOnDrillOpen.displayName = 'ShowOnDrillOpen';

export { ShowOnDrillOpen };
export type { ShowOnDrillOpenProps };
