const prefersReducedMotion = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export { prefersReducedMotion };
