import { useEffect } from "react";


const useEscapeKey = (active: boolean, onEscape: () => void): void => {
	useEffect(() => {
		if (!active) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') {
				onEscape();
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => { window.removeEventListener('keydown', handleKeyDown); };
	}, [active, onEscape]);
};

export { useEscapeKey };
