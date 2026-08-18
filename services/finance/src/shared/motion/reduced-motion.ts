const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const prefersReducedMotion = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

export { prefersReducedMotion };
