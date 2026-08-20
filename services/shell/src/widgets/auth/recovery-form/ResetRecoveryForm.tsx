import type { FC } from "react";
import { useCallback } from "react";
import {
	UiButton,
	UiFormControl,
	UiFormItem,
	UiFormLabel,
	UiFormMessage,
	FormWizard,
	UiInputOTP,
	UiInputOTPGroup,
	UiInputOTPSeparator,
	UiInputOTPSlot,
	PasswordInput,
	FormWizardBack
} from "@internal/ui-library";
import { z } from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormButton } from "@entity/auth";
import { usePasswordChecks, useRecoveryCode } from "@feature/auth";


type ResetRecoveryFormProps = object & {};

const ResetRecoveryForm: FC<ResetRecoveryFormProps> = () => {
	const { checkPasswordStrength, checkPasswordCompromised } = usePasswordChecks();
	const { error, resetPassword } = useRecoveryCode();
	const formSchema = z.object({
		code: z.string()
			.min(6, "Code size must be 6 digits")
			.max(6, "Code size must be 6 digits"),
		password: z.string()
			.min(8, "Password must be at least 8 characters long")
			.refine(checkPasswordStrength, { message: "Password is too weak" })
			.refine(checkPasswordCompromised, { message: "Password has been compromised" }),
	});

	const handleSubmit = useCallback(async (
		values: Record<string, unknown>
	): Promise<boolean> => {
		if (
			!values.password || typeof values.password !== 'string' ||
			!values.code || typeof values.code !== 'string'
		) return false;

		return await resetPassword(values.code, values.password);
	}, [resetPassword]);

	return (
		<FormWizard.StepForm onSubmit={handleSubmit} formSchema={formSchema} order={2}>
			<div className="flex flex-col gap-8">
				<FormWizard.StepField formSchema={formSchema} name="code">
					{({ field }) => (
						<UiFormItem className="flex flex-col">
							<UiFormLabel className="pb-2">Email Code</UiFormLabel>
							<UiFormControl>
								<UiInputOTP maxLength={6} {...field}>
									<UiInputOTPGroup>
										{Array.from({ length: 3 }, (_, index) => (
											<UiInputOTPSlot className="w-11.5 h-11.5" index={index} key={index} />
										))}
									</UiInputOTPGroup>
									<UiInputOTPSeparator />
									<UiInputOTPGroup>
										{Array.from({ length: 3 }, (_, index) => (
											<UiInputOTPSlot className="w-11.5 h-11.5" index={index + 3} key={index} />
										))}
									</UiInputOTPGroup>
								</UiInputOTP>
							</UiFormControl>
							<div className="text-left">
								<UiFormMessage className="text-xs" />
							</div>
						</UiFormItem>
					)}
				</FormWizard.StepField>
				<FormWizard.StepField formSchema={formSchema} name="password">
					{({ field }) => (
						<UiFormItem className="flex flex-col">
							<UiFormLabel className="pb-2">New Password</UiFormLabel>
							<UiFormControl>
								<PasswordInput {...field} />
							</UiFormControl>
							<div className="text-left">
								<UiFormMessage className="text-xs" />
							</div>
						</UiFormItem>
					)}
				</FormWizard.StepField>
				<div className="flex flex-col gap-2 text-left">
					<p className="text-destructive text-xs">{ error ?? '' }</p>
					<div className="flex gap-2 items-center">
						<FormWizardBack>
							<UiButton type="submit" size="icon" variant="outline" className="hover:gap-4">
								<ArrowLeft width={6} height={6} />
							</UiButton>
						</FormWizardBack>
						<FormButton type="submit" size="sm" className="hover:gap-4 grow">
							Continue
							<ArrowRight width={8} height={8} />
						</FormButton>
					</div>
				</div>
			</div>
		</FormWizard.StepForm>
	);
};

ResetRecoveryForm.displayName = 'RecoveryForm';

export { ResetRecoveryForm };
export type { ResetRecoveryFormProps };