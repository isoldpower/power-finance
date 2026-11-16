import { MINIMUM_TICK_SPACING } from "./config.ts";


const tickIndices = (count: number, width: number): number[] => {
	const maxTicks = Math.max(2, Math.floor(width / MINIMUM_TICK_SPACING));
	const step = Math.max(1, Math.ceil(count / maxTicks));

	return Array.from({ length: count }, (_, index) => index).filter((index) => index % step === 0);
};

export { tickIndices };
