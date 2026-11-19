import { TICK_SPACING } from "../config.ts";


const domainTicks = ([start, end]: [number, number], width: number): number[] => {
	const span = end - start;
	const fittingTicks = Math.max(2, Math.floor(width / TICK_SPACING));
	const step = Math.max(1, Math.ceil(span / fittingTicks));
	const tickCount = Math.floor(span / step) + 1;

	return Array.from({ length: tickCount }, (_, index) => {
		const position = start + index * step;

		return Math.round(position);
	});
};

export { domainTicks };
