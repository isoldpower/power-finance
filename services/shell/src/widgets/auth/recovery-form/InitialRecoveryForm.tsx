import {FC, useCallback} from "react";

import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage, FormWizard, Input } from "@shared/components";
import { useRecoveryCode } from "@feature/auth";
import { FormButton } from "@entity/auth";


interface InitialRecoveryFormProps {}

const InitialRecoveryForm: FC<InitialRecoveryFormProps> = () => {
	const { verifyEmail, error } = useRecoveryCode();
	const formSchema = z.object({
		email: z.string().email("Invalid email address").nonempty("Email is required"),
	});

	const handleSubmit = useCallback(async (
		values: Record<string, unknown>
	): Promise<boolean> => {
		if (!values.email || typeof values.email !== 'string') return false;

		return await verifyEmail(values.email as string);
	}, [verifyEmail]);

	return (
		<FormWizard.StepForm onSubmit={handleSubmit} formSchema={formSchema} order={1}>
			<div className="flex flex-col gap-8">
				<FormWizard.StepField formSchema={formSchema} name="email">
					{({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email address" {...field} />
							</FormControl>
							<div className="text-left">
								<FormMessage className="text-xs">{ error ?? '' }</FormMessage>
							</div>
						</FormItem>
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