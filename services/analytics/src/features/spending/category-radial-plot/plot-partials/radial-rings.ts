import { HOLE_RATIO, MAX_SWEEP, RING_FILL } from "../config.ts";

import type { BreakdownSlice } from "@entity/spending";


type PresentSlice = BreakdownSlice & { presence: number };

interface RadialRing {
	slice: PresentSlice;
	innerRadius: number;
	outerRadius: number;
	endAngle: number;
}

const cumulativeOffsets = (slices: PresentSlice[]): number[] => {
	return slices.reduce<number[]>((offsets, slice) => {
		const previousOffset = offsets.at(-1) ?? 0;

		return [...offsets, previousOffset + slice.presence];
	}, [0]);
};

const radialRings = (slices: PresentSlice[], outer: number, progress: number): RadialRing[] => {
	const hole = outer * HOLE_RATIO;
	const ringSpace = outer - hole;
	const totalPresence = slices.reduce((sum, slice) => sum + slice.presence, 0);
	const step = ringSpace / Math.max(1, totalPresence);
	const shares = slices.map((slice) => slice.share);
	const maxShare = Math.max(1, ...shares);
	const offsets = cumulativeOffsets(slices);

	return slices.map((slice, index) => {
		const outerRadius = outer - offsets[index] * step;
		const ringThickness = step * RING_FILL * slice.presence;
		const shareRatio = slice.share / maxShare;

		return {
			slice,
			innerRadius: outerRadius - ringThickness,
			outerRadius,
			endAngle: shareRatio * MAX_SWEEP * progress,
		};
	});
};

export { radialRings };
export type { PresentSlice, RadialRing };
