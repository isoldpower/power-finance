import { useEffect, useState } from "react";

// Driven by JS so responsive behavior never depends on a Tailwind display
// utility being generated for a given breakpoint.
const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(
		() => typeof window !== 'undefined' && window.matchMedia(query).matches
	);

	useEffect(() => {
		const mql = window.matchMedia(query);
		const onChange = (event: MediaQueryListEvent) => { setMatches(event.matches); };
		setMatches(mql.matches);
		mql.addEventListener('change', onChange);
		return () => { mql.removeEventListener('change', onChange); };
	}, [query]);

	return matches;
};

const useIsDesktop = (): boolean => useMediaQuery('(min-width: 1024px)');

export { useMediaQuery, useIsDesktop };
