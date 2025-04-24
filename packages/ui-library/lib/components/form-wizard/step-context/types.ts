import type { UseFormReturn } from "react-hook-form";

interface WizardStepContextType {
	form: UseFormReturn
	order: number
	active: boolean
}

export type { WizardStepContextType };
