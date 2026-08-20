import { z } from "zod";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FormWizard } from "./form-wizard.tsx";
import {
	UiInput,
	UiButton,
	UiFormItem,
	UiFormLabel,
	UiFormControl,
	UiFormMessage,
} from "@/entities/root";

const accountSchema = z.object({ email: z.string().email("Enter a valid email") });
const securitySchema = z.object({ password: z.string().min(6, "At least 6 characters") });

const meta = {
	title: "Components/FormWizard",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`FormWizard` orchestrates a multi-step form. Each `FormWizard.StepForm` owns its own `react-hook-form` instance and zod `formSchema`, and only the active step renders.",
					"Declare fields with `FormWizard.StepField`, move backward with `FormWizard.ReturnAction`, and advance each step with a `type=\"submit\"` button. Values accumulate across steps and are handed to `onFinish` once the final step validates.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoSteps: Story = {
	parameters: {
		docs: { description: { story: "A two-step sign-up — email, then password. Each step validates before advancing; `onFinish` receives the merged values." } },
	},
	render: () => (
		<FormWizard onFinish={() => true}>
			<FormWizard.StepForm order={0} formSchema={accountSchema} defaultValues={{ email: "" }}>
				<div className="grid max-w-xs gap-4">
					<FormWizard.StepField name="email" formSchema={accountSchema}>
						{({ field }) => (
							<UiFormItem>
								<UiFormLabel>Email</UiFormLabel>
								<UiFormControl>
									<UiInput placeholder="you@example.com" {...field} />
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						)}
					</FormWizard.StepField>
					<UiButton type="submit">Next</UiButton>
				</div>
			</FormWizard.StepForm>
			<FormWizard.StepForm order={1} formSchema={securitySchema} defaultValues={{ password: "" }}>
				<div className="grid max-w-xs gap-4">
					<FormWizard.StepField name="password" formSchema={securitySchema}>
						{({ field }) => (
							<UiFormItem>
								<UiFormLabel>Password</UiFormLabel>
								<UiFormControl>
									<UiInput type="password" {...field} />
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						)}
					</FormWizard.StepField>
					<div className="flex gap-2">
						<FormWizard.ReturnAction>
							<UiButton variant="outline">Back</UiButton>
						</FormWizard.ReturnAction>
						<UiButton type="submit">Finish</UiButton>
					</div>
				</div>
			</FormWizard.StepForm>
		</FormWizard>
	),
};
