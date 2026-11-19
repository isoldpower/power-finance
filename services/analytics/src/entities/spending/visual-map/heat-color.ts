import { OUTFLOW_COLOR } from "@shared/charts";


const HEAT_EMPTY = 'var(--chart-heat-0)';
const HEAT_STEPS = 5;

const heatColor = (intensity: number, hue = 'var(--primary)'): string => {
	if (intensity <= 0) {
		return HEAT_EMPTY;
	}

	const step = Math.min(HEAT_STEPS, Math.max(1, Math.ceil(intensity * HEAT_STEPS)));
	const share = Math.round((step / HEAT_STEPS) * 85 + 10);

	return `color-mix(in srgb, ${hue} ${share.toString()}%, var(--chart-heat-0))`;
};

const HEAT_FILLS = Array.from({ length: HEAT_STEPS }, (_, step) => {
	const intensity = (step + 1) / HEAT_STEPS;

	return heatColor(intensity, OUTFLOW_COLOR);
});

const HEAT_SCALE = [HEAT_EMPTY, ...HEAT_FILLS];

export { HEAT_EMPTY, HEAT_SCALE, heatColor };
