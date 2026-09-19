import { useEffect } from "react";


interface TourKeyboardOptions {
	active: boolean;
	stepForward: () => void;
	stepBack: () => void;
	skipTour: () => void;
}

const useTourKeyboard = ({ active, stepForward, stepBack, skipTour }: TourKeyboardOptions) => {
	useEffect(() => {
		if (!active) return;

		const handleKey = (event: KeyboardEvent) => {
			if (event.key === 'ArrowRight') stepForward();
			if (event.key === 'ArrowLeft') stepBack();
			if (event.key === 'Escape') skipTour();
		};

		window.addEventListener('keydown', handleKey);

		return () => { window.removeEventListener('keydown', handleKey); };
	}, [active, stepForward, stepBack, skipTour]);
};

export { useTourKeyboard };
