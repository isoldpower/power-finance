import {use} from "react";
import {SlideOverContext} from "./context.ts";


const useSlideOverContext = () => {
	const contextValue = use(SlideOverContext);

	if (!contextValue) {
		throw new Error('useSlideOverContext must be used as useSlideOverContext');
	}

	return contextValue;
}

export { useSlideOverContext };
