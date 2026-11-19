import { useMemo, useState } from "react";
import { autoGranularity, isGranularityAllowed } from "@entity/filters";

import type { DateRange, Granularity } from "@entity/filters";


interface UseGranularityReturn {
	granularity: Granularity;
	setGranularity: (granularity: Granularity) => void;
}

const useGranularity = (range: DateRange): UseGranularityReturn => {
	const [chosen, setGranularity] = useState<Granularity | null>(null);

	const granularity = useMemo(() => {
		return chosen !== null && isGranularityAllowed(range, chosen) 
			? chosen 
			: autoGranularity(range);
	}, [chosen, range]);

	return useMemo(() => ({
		granularity,
		setGranularity
	}), [granularity]);
};

export { useGranularity };
export type { UseGranularityReturn };
