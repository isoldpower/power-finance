import { NEW_VALUE_LABEL, signSymbol } from "@shared/formatting";


const POINTS_FRACTION_DIGITS = 1;

const formatChangePoints = (change: number | null): string => {
	if (change === null) {
		return NEW_VALUE_LABEL;
	}

	const magnitude = Math.abs(change).toFixed(POINTS_FRACTION_DIGITS);

	return `${signSymbol(change)}${magnitude} pp`;
};

export { formatChangePoints };
