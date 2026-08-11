import {useCallback, useEffect, useMemo, useState} from "react";
import type { SlideOverContextType } from "./context.ts";
import type { SlideOverEvent, SlideOverPanelsRegistry } from "../types.ts";


const useContextState = (panelsRegistry: SlideOverPanelsRegistry) => {
	const [currentSlide, setCurrentSlide] = useState<string | null>(null);

	const handleSlideClose= useCallback(() => {
		setCurrentSlide(null);
	}, []);
	const handleSlideSwitch = useCallback((newSlide: string) => {
		setCurrentSlide((current) => newSlide in panelsRegistry ? newSlide : current);
	}, [panelsRegistry]);

	const contextValue = useMemo<SlideOverContextType>(() => ({
		onClose: handleSlideClose,
		currentSlide: currentSlide,
		onSwitch: handleSlideSwitch,
	}), [currentSlide, handleSlideClose, handleSlideSwitch]);
	
	const currentPanel = useMemo(() => {
		return currentSlide ? panelsRegistry[currentSlide] : null;
	}, [currentSlide, panelsRegistry]);

	useEffect(() => {
		function onSlideOverOpen(event: CustomEvent<SlideOverEvent>) {
			if (currentSlide !== event.detail.panelId) {
				setCurrentSlide(event.detail.panelId);
			}
		}

		window.addEventListener('slideoveropen', onSlideOverOpen);
		return () => {
			window.removeEventListener('slideoveropen', onSlideOverOpen);
		}
	}, [currentSlide]);
	
	return {
		currentPanel,
		contextValue
	};
}

export { useContextState };