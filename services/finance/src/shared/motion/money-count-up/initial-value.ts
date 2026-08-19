const EMPTY_VALUE = 0;

function initialValue(
	target: number | null,
	introRatio: number,
	reducedMotion: boolean,
): number {
	if (target === null) {
		return EMPTY_VALUE;
	}

	return reducedMotion 
		? target 
		: target * introRatio;
}

export { initialValue };