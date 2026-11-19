import type { TrendRow } from "@entity/spending";
import type { StackedLayer } from "./types.ts";


const streamMidpoints = (rows: TrendRow[], layers: StackedLayer[]): number[] => {
	return rows.map((_, index) => {
		const floors = layers.map((layer) => layer.bands[index][0]);
		const ceilings = layers.map((layer) => layer.bands[index][1]);
		const lowest = Math.min(...floors);
		const highest = Math.max(...ceilings);

		return (lowest + highest) / 2;
	});
};

export { streamMidpoints };
