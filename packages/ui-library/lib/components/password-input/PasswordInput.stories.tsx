import type { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordInput } from "./PasswordInput.tsx";

const meta = {
	title: "Components/PasswordInput",
	component: PasswordInput,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`PasswordInput` is a `UiInput` with a built-in show/hide toggle. It forwards its ref and accepts every input prop, so it drops straight into `react-hook-form`.",
					"The reveal button is disabled while the field is empty so it can't expose nothing; pass `enableButton` to keep it always active.",
				].join("\n\n"),
			},
		},
	},
	args: { placeholder: "Enter password" },
	argTypes: {
		enableButton: {
			description: "Keep the reveal toggle enabled even when the field is empty.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		disabled: { description: "Disable the field.", control: "boolean" },
	},
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "Type a value, then use the eye button to reveal or hide it." } } },
	args: { enableButton: true },
};
