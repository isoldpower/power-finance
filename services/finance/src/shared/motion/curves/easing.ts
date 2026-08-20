function easeOutCubic(progress: number): number {
	return 1 - Math.pow(1 - progress, 3);
}

export { easeOutCubic };
