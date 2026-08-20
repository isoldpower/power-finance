import { createContext } from "react";

interface SlideOverContextType {
	onClose: () => void;
	onSwitch: (newPanel: string) => void;
	currentSlide: string | null;
}

const SlideOverContext = createContext<SlideOverContextType | null>(null);

export { SlideOverContext };
export type { SlideOverContextType };