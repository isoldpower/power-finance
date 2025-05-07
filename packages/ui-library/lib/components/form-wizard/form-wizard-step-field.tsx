import { useMemo } from "react";
import { z } from "zod";
import type { ZodType } from "zod";
import type { ControllerProps, FieldValues, Path, UseFormReturn } from "react-hook-form";

import { FormField } from '@/components';
import { useWizardStepContext } from "./step-context/context.ts";


type FormWizardStepFieldProps<
	T1 extends FieldValues,
	T2 extends z.ZodTypeDef
> = {
	name: Path<T1>
	formSchema: ZodType<T1, T2, T1>
	children: ControllerProps<T1, Path<T1>>['render']
} & Omit<ControllerProps<T1, Path<T1>>, 'control' | 'render'>

function FormWizardStepField<
	T1 extends FieldValues,
	T2 extends z.ZodTypeDef
>({ children, ...props }: FormWizardStepFieldProps<T1, T2>) {
	const { form } = useWizardStepContext();
	const parsedForm = useMemo(() => form as UseFormReturn<T1>, [form]);

	return (
		<FormField control={parsedForm.control} render={children} {...props} />
	)
}

FormWizardStepField.displayName = 'FormWizardStepField';

export { FormWizardStepField };
export type { FormWizardStepFieldProps };
