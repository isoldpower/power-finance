import { useMemo } from "react";
import { rangeDays } from "@entity/filters";
import { useDateFormat } from "@shared/formatting";
import { useActiveRange } from "../active-range";


const useActiveRangeLabel = (): string[] => {
	const range = useActiveRange();
	const { formatRange } = useDateFormat();

	return useMemo(() => {
		const period = formatRange(range.since, range.until);
		const days = rangeDays(range).toString();

		return [period, `${days} days`];
	}, [formatRange, range]);
};

export { useActiveRangeLabel };
