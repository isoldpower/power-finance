import { useEffect, useState } from "react";


const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(
		() => typeof window !== 'undefined' && window.matchMedia(query).matches
	);

	useEffect(() => {
		const mediaList = window.matchMedia(query);
		function onChange(event: MediaQueryListEvent) {
			setMatches(event.matches);
		}
		
		setMatches(mediaList.matches);

		mediaList.addEventListener('change', onChange);
		return () => {
			mediaList.removeEventListener('change', onChange); 
		};
	}, [query]);

	return matches;
};

const useIsDesktop = (): boolean => useMediaQuery('(min-width: 1024px)');

export { useIsDesktop };
