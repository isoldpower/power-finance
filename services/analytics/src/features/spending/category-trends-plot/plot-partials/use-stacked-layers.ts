import { useMemo } from "react";
import { stack } from "@visx/shape";

import type { TrendRow, TrendsMode } from "@entity/spending";
import type { StackedLayout } from "./types.ts";


const stackBounds = (values: number[]): { min: number; max: number } => ({
	min: values.length > 0 ? Math.min(0, ...values) : 0,
	max: values.length > 0 ? Math.max(1, ...values) : 1,
});

const useStackedLayers = (rows: TrendRow[], keys: string[], mode: TrendsMode): StackedLayout => {
	return useMemo(() => {
		const generator = stack<TrendRow, string>({
			keys,
			value: (row, key) => row.values[key] ?? 0,
			offset: mode === 'stream' ? 'wiggle' : 'none',
			order: mode === 'stream' ? 'insideout' : 'none',
		});
		const series = generator(rows);
		const layers = series.map((layer) => ({
			key: layer.key,
			bands: layer.map((point) => [point[0], point[1]] as [number, number]),
		}));

		return { layers };
	}, [rows, keys, mode]);
};

export { stackBounds, useStackedLayers };
