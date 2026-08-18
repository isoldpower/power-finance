const EASE_OUT_EXPONENT = 3;

// Decelerating curve: fast at the start, gentle as it settles on the target.
const easeOutCubic = (progress: number): number => {
	return 1 - Math.pow(1 - progress, EASE_OUT_EXPONENT);
};

export { easeOutCubic };
