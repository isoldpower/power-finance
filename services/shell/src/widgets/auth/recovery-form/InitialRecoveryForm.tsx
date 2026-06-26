import { useCallback } from "react";
import type { FC } from "react";

import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { UiFormControl, UiFormItem, UiFormLabel, UiFormMessage, FormWizard, UiInput } from "@internal/ui-library";
import { useRecoveryCode } from "@feature/auth";
import { FormButton } from "@entity/auth";


type InitialRecoveryFormProps = object & {};

const InitialRecoveryForm: FC<InitialRecoveryFormProps> = () => {
	const { verifyEmail, error } = useRecoveryCode();
	const formSchema = z.object({
		email: z.string().email("Invalid email address").nonempty("Email is required"),
	});

	const handleSubmit = useCallback(async (
		values: Record<string, unknown>
	): Promise<boolean> => {
		if (!values.email || typeof values.email !== 'string') return false;

		return await verifyEmail(values.email);
	}, [verifyEmail]);

	return (
		<FormWizard.StepForm onSubmit={handleSubmit} formSchema={formSchema} order={1}>
			<div className="flex flex-col gap-8">
				<FormWizard.StepField formSchema={formSchema} name="email">
					{({ field }) => (
						<UiFormItem>
							<UiFormLabel>Email address</UiFormLabel>
							<UiFormControl>
								<UiInput placeholder="Enter your email address" {...field} />
							</UiFormControl>
							<div className="text-left">
								<UiFormMessage className="text-xs">{ error ?? '' }</UiFormMessage>
							</div>
						</UiFormItem>
					)}
				</FormWizard.StepField>
				<FormButton type="submit" size="sm" className="hover:gap-4">
					Continue
					<ArrowRight width={8} height={8} />
				</FormButton>
			</div>
		</FormWizard.StepForm>
	);
};

InitialRecoveryForm.displayName = 'RecoveryForm';

export { InitialRecoveryForm };
export type { InitialRecoveryFormProps };