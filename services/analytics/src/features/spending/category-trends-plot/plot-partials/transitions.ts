import type { StackedLayer } from "./types.ts";


const collapseToFloor = (layer: StackedLayer): StackedLayer => ({
	...layer,
	bands: layer.bands.map(([floor]) => [floor, floor]),
});

const collapseToZero = (layer: StackedLayer): StackedLayer => ({
	...layer,
	bands: layer.bands.map(() => [0, 0]),
});

export { collapseToFloor, collapseToZero };
