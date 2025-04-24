import { useState, useRef, useMemo, useCallback, useId } from "react";
import type { ReactNode } from "react";

import { FormWizardProvider } from "./context/context.ts";
import { defaultFormWizardValue } from "./context/config.ts";
import { FormWizardStep } from "./form-wizard-step.tsx";
import { FormWizardBack } from "./form-wizard-back.tsx";
import { FormWizardStepField } from "./form-wizard-step-field.tsx";
import type { FormWizardContextType, FormWizardPayload, ResolvedWizardStep } from './context/types.ts';


interface FormWizardProps {
	children: ReactNode;
	onFinish?: (values: Record<string, unknown>) => boolean | Promise<boolean>;
}

function FormWizard({
		children,
		onFinish
}: FormWizardProps) {
	const wrapperReference = useRef<HTMLDivElement | null>(null);
	const uid = useId();

	const [steps, setSteps] = useState<ResolvedWizardStep[]>([]);
	const [activeIndex, setActiveIndex] = useState<number>(-1);
	const [savedValues, setSavedValues] = useState<Record<string, unknown>>({});

	const value = useMemo<FormWizardContextType>(() => ({
		steps: steps.reduce((acc, step) => {
			acc[step.order] = step;
			return acc;
		}, {} as Record<number, ResolvedWizardStep>),
		activeStep: steps[activeIndex]?.order ?? defaultFormWizardValue.activeStep,
		savedValues
	}), [steps, activeIndex, savedValues]);

	const addStep = useCallback((value: ResolvedWizardStep) => {
		if (activeIndex < 0) setActiveIndex(0);
		setSteps((cur) => [...cur, value]);
	}, [setSteps]);

	const removeStep = useCallback((value: ResolvedWizardStep) => {
		setSteps((cur) => cur.filter((step) => step.order !== value.order));
	}, [setSteps]);

	const handleConfirm = useCallback((values: Record<string, unknown>) => {
		const newValues = Object.assign(savedValues, values);
		setSavedValues(newValues);

		if (activeIndex + 1 < steps.length) setActiveIndex((cur) => cur + 1);
		else if (activeIndex + 1 === steps.length) onFinish?.(newValues);
	}, [activeIndex, steps, onFinish]);

	const handleBack = useCallback(() => {
		if (activeIndex > 0) {
			setActiveIndex((cur) => cur - 1);
		}
	}, [activeIndex]);

	const payload = useMemo<FormWizardPayload>(() => ({
		addStep,
		removeStep,
		handleConfirm,
		uid,
		stepBack: handleBack,
		...value
	}), [addStep, removeStep, handleConfirm, handleBack, uid, value]);

	return (
		<FormWizardProvider value={payload}>
			<div ref={wrapperReference}>
				{ children }
			</div>
		</FormWizardProvider>
	)
}

FormWizard.displayName = 'FormWizard';
FormWizard.StepForm = FormWizardStep;
FormWizard.ReturnAction = FormWizardBack;
FormWizard.StepField = FormWizardStepField;

export { FormWizard };
export type { FormWizardProps };
