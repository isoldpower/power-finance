import { ACTIVE_OFFSET } from "./config.ts";


interface SliceOffset {
	x: number;
	y: number;
}

const outwardOffset = ([centroidX, centroidY]: [number, number]): SliceOffset => {
	const distance = Math.hypot(centroidX, centroidY);
	const length = distance > 0 ? distance : 1;

	return {
		x: (centroidX / length) * ACTIVE_OFFSET,
		y: (centroidY / length) * ACTIVE_OFFSET,
	};
};

export { outwardOffset };
export type { SliceOffset };
