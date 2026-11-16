import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { lastDayInputValue, rangeFromDateInputs, toDateInputValue } from "@entity/filters";
import { useActiveRange } from "../active-range";
import { useAnalyticsFilters } from "../filter-store";


interface CustomRangeInputs {
	active: boolean;
	firstDay: string;
	lastDay: string;
	today: string;
	handleFirstDayChange: (value: string) => void;
	handleLastDayChange: (value: string) => void;
}

const useCustomRangeInputs = (): CustomRangeInputs => {
	const range = useActiveRange();
	const { preset, chooseCustomRange } = useAnalyticsFilters(useShallow((state) => ({
		preset: state.preset,
		chooseCustomRange: state.chooseCustomRange,
	})));
	const firstDay = useMemo(() => toDateInputValue(range.since), [range.since]);
	const lastDay = useMemo(() => lastDayInputValue(range), [range]);
	const today = useMemo(() => toDateInputValue(new Date().toISOString()), []);

	const handleFirstDayChange = useCallback((value: string) => {
		const nextRange = rangeFromDateInputs(value, lastDay);

		if (nextRange) {
			chooseCustomRange(nextRange);
		}
	}, [lastDay, chooseCustomRange]);

	const handleLastDayChange = useCallback((value: string) => {
		const nextRange = rangeFromDateInputs(firstDay, value);

		if (nextRange) {
			chooseCustomRange(nextRange);
		}
	}, [firstDay, chooseCustomRange]);

	return useMemo(() => ({
		active: preset === 'custom',
		firstDay,
		lastDay,
		today,
		handleFirstDayChange,
		handleLastDayChange,
	}), [preset, firstDay, lastDay, today, handleFirstDayChange, handleLastDayChange]);
};

export { useCustomRangeInputs };
export type { CustomRangeInputs };
