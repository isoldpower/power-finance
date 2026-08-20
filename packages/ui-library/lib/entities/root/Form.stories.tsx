import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiForm,
	UiFormField,
	UiFormItem,
	UiFormLabel,
	UiFormControl,
	UiFormDescription,
	UiFormMessage,
} from "./Form.tsx";
import { UiInput } from "./Input.tsx";
import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Form",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiForm` is the `react-hook-form` binding layer over the shadcn Form. `UiForm` is the provider (spread your `useForm` return into it).",
					"Each field is a `UiFormField` (which keeps generic field-name typing) wrapping a `UiFormItem`; inside, `UiFormLabel`, `UiFormControl`, `UiFormDescription` and `UiFormMessage` are wired together by context, so the label points at the control and validation errors render automatically.",
					"`UiForm` and `UiFormField` are re-exported unwrapped on purpose — wrapping them would erase react-hook-form's generic inference.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A one-field form showing label, control, description and message wired through context." } } },
	render: () => {
		const Demo = () => {
			const form = useForm({ defaultValues: { username: "" } });
			return (
				<UiForm {...form}>
					<form onSubmit={form.handleSubmit(() => {})} className="grid max-w-xs gap-4">
						<UiFormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<UiFormItem>
									<UiFormLabel>Username</UiFormLabel>
									<UiFormControl>
										<UiInput placeholder="alex" {...field} />
									</UiFormControl>
									<UiFormDescription>Your public display name.</UiFormDescription>
									<UiFormMessage />
								</UiFormItem>
							)}
						/>
						<UiButton type="submit">Save</UiButton>
					</form>
				</UiForm>
			);
		};
		return <Demo />;
	},
};
