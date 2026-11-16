import type { TrendLayer } from "@entity/spending";
import type { StackedLayer } from "./types.ts";


interface LayerBand {
	band: StackedLayer;
	layer: TrendLayer;
	points: BandPoint[];
}

interface BandPoint {
	index: number;
	band: [number, number];
}

const layerBands = (stacked: StackedLayer[], layerOf: ReadonlyMap<string, TrendLayer>): LayerBand[] => {
	return stacked.flatMap((band) => {
		const layer = layerOf.get(band.key);

		if (!layer) {
			return [];
		}

		const points = band.bands.map((edges, index) => ({ index, band: edges }));

		return [{ band, layer, points }];
	});
};

export { layerBands };
export type { BandPoint, LayerBand };
