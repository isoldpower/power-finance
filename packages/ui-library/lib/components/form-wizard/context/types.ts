interface ResolvedWizardStep {
	order: number
	label: string
}

interface FormWizardContextType {
	steps: Record<number, ResolvedWizardStep>
	activeStep: number
	savedValues: Record<string, unknown>
}

interface FormWizardPayload extends FormWizardContextType {
	addStep: (step: ResolvedWizardStep) => void
	removeStep: (step: ResolvedWizardStep) => void
	handleConfirm: (values: Record<string, unknown>) => void
	stepBack: () => void
	uid: string
}

export type { ResolvedWizardStep, FormWizardContextType, FormWizardPayload };