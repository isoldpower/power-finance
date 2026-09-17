import { createContext, useContext } from "react";
import type { TourStepContextType } from "./types.ts";

const stepContext = createContext<TourStepContextType | null>(null);

const TourStepContextProvider = stepContext.Provider;
const TourStepContextConsumer = stepContext.Consumer;

const useTourStepContext = (): TourStepContextType => {
	const context = useContext(stepContext);

	if (!context) {
		throw new Error('useTourStepContext must be used within a TourStepContextProvider');
	}

	return context;
};

export { stepContext, TourStepContextProvider, TourStepContextConsumer };
export { useTourStepContext };
