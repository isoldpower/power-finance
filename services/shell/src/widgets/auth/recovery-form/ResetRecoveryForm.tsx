import type { FC } from "react";
import { useCallback } from "react";
import {
	Button,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormWizard,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	PasswordInput,
	FormWizardBack
} from "@internal/ui-library";
import { z } from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormButton } from "@entity/auth";
import { usePasswordChecks, useRecoveryCode } from "@feature/auth";


interface ResetRecoveryFormProps {}

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

		return await resetPassword(values.code as string, values.password as string);
	}, [resetPassword]);

	return (
		<FormWizard.StepForm onSubmit={handleSubmit} formSchema={formSchema} order={2}>
			<div className="flex flex-col gap-8">
				<FormWizard.StepField formSchema={formSchema} name="code">
					{({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="pb-2">Email Code</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup>
										{Array.from({ length: 3 }, (_, index) => (
											<InputOTPSlot className="w-11.5 h-11.5" index={index} key={index} />
										))}
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										{Array.from({ length: 3 }, (_, index) => (
											<InputOTPSlot className="w-11.5 h-11.5" index={index + 3} key={index} />
										))}
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<div className="text-left">
								<FormMessage className="text-xs" />
							</div>
						</FormItem>
					)}
				</FormWizard.StepField>
				<FormWizard.StepField formSchema={formSchema} name="password">
					{({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="pb-2">New Password</FormLabel>
							<FormControl>
								<PasswordInput {...field} />
							</FormControl>
							<div className="text-left">
								<FormMessage className="text-xs" />
							</div>
						</FormItem>
					)}
				</FormWizard.StepField>
				<div className="flex flex-col gap-2 text-left">
					<p className="text-destructive text-xs">{ error ?? '' }</p>
					<div className="flex gap-2 items-center">
						<FormWizardBack>
							<Button type="submit" size="icon" variant="outline" className="hover:gap-4">
								<ArrowLeft width={6} height={6} />
							</Button>
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