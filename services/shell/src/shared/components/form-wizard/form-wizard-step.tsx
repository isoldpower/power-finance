import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ReactNode } from "react";
import type { ZodType } from "zod";
import type { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";

import { Form } from '@shared/components';
import { useFormWizardContext } from "./context/context.ts";
import { WizardStepContextProvider } from "./step-context/context.ts";
import type { WizardStepContextType } from "./step-context/types.ts";


type FormWizardStepProps<
	T1 extends FieldValues,
	T2 extends z.ZodTypeDef
> = {
	children: ReactNode;
	formSchema: ZodType<T1, T2, T1>;
	order: number;
	defaultValues?: DefaultValues<T1>;
	onSubmit?: (values: T1) => boolean | Promise<boolean>;
}

function FormWizardStep<
	T1 extends FieldValues,
	T2 extends z.ZodTypeDef
>({
	children,
	formSchema,
	order,
	defaultValues,
	onSubmit: externalOnSubmit
}: FormWizardStepProps<T1, T2>) {
	const { addStep, savedValues, activeStep, handleConfirm, uid } = useFormWizardContext();
	const label = useMemo(() => `${uid}-step-${order}`, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	useEffect(() => {
		addStep({
			order,
			label
		})
	}, []);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const payload = { ...values, ...savedValues };

		externalOnSubmit && Promise
			.resolve(externalOnSubmit(payload))
			.then((value) => value && handleConfirm(payload));

		if (!externalOnSubmit) {
			handleConfirm(payload);
		}
	}

	const contextValue = useMemo<WizardStepContextType>(() => ({
		order,
		form: form as UseFormReturn,
		active: activeStep === order
	}), [form, order, activeStep]);

	return activeStep === order && (
		<Form {...form}>
			<form aria-label={label} onSubmit={form.handleSubmit(onSubmit)}>
				<WizardStepContextProvider value={contextValue}>
					{children}
				</WizardStepContextProvider>
			</form>
		</Form>
	)
}

FormWizardStep.displayName = 'FormWizardStep';

export type { FormWizardStepProps };
export { FormWizardStep };