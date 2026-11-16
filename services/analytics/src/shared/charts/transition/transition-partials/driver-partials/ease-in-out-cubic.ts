const easeInOutCubic = (progress: number): number => (
	progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
);

export { easeInOutCubic };
