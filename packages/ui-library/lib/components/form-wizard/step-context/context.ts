import {createContext, useContext} from "react";
import type { WizardStepContextType } from "./types.ts";

const stepContext = createContext<WizardStepContextType | null>(null);

const WizardStepContextProvider = stepContext.Provider;
const WizardStepContextConsumer = stepContext.Consumer;

const useWizardStepContext = (): WizardStepContextType => {
	const context = useContext(stepContext);

	if (!context) {
		throw new Error('useWizardStepContext must be used within a WizardStepContextProvider');
	}

	return context;
};

export { stepContext, WizardStepContextProvider, WizardStepContextConsumer };
export { useWizardStepContext };