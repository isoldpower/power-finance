import type { BreakdownSlice } from "@entity/spending";


interface BreakdownChartProps {
	slices: BreakdownSlice[];
	currency: string;
	colorOf: (key: string) => string;
	focused: string | null;
	onFocus: (key: string | null) => void;
	onSelect: (slice: BreakdownSlice) => void;
}

export type { BreakdownChartProps };
