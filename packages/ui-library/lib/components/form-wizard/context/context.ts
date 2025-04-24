import { createContext, useContext } from "react";
import type { FormWizardPayload } from "./types.ts";

const FormWizardContext = createContext<FormWizardPayload | null>(null)

const FormWizardProvider = FormWizardContext.Provider;
const FormWizardConsumer = FormWizardContext.Consumer;

const useFormWizardContext = () => {
	const context = useContext(FormWizardContext);

	if (!context) {
		throw new Error('useFormWizardContext must be used within a FormWizardProvider');
	}

	return context;
}

export { FormWizardContext, FormWizardProvider, FormWizardConsumer };
export { useFormWizardContext };