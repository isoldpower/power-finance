import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiInput } from "./Input.tsx";

const meta = {
	title: "Root/Input",
	component: UiInput,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiInput` is the single-line text field — a ref-forwarding wrapper around the shadcn Input.",
					"It accepts every native `<input>` prop. The forwarded ref makes it work with focus management and `react-hook-form` registration; pair it with `UiLabel` for accessible labelling.",
				].join("\n\n"),
			},
		},
	},
	args: { placeholder: "you@example.com" },
	argTypes: {
		type: {
			description: "Native input type.",
			control: "select",
			options: ["text", "email", "password", "number", "search", "tel"],
			table: { defaultValue: { summary: "text" } },
		},
		disabled: { description: "Disable the field.", control: "boolean" },
		placeholder: { description: "Hint text shown when empty.", control: "text" },
	},
} satisfies Meta<typeof UiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "An empty field with placeholder text." } } },
};

export const Disabled: Story = {
	parameters: { docs: { description: { story: "Disabled, non-editable state." } } },
	args: { disabled: true, value: "Read only" },
};
