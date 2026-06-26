import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiToggle } from "./Toggle.tsx";

const meta = {
	title: "Root/Toggle",
	component: UiToggle,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiToggle` is a single two-state button — a ref-forwarding wrapper around the shadcn Toggle (Radix Toggle).",
					"Use it for a standalone on/off control such as a formatting button. Control it with `pressed` + `onPressedChange`, and always provide an `aria-label` when the content is icon-only. For a set of related toggles use `UiToggleGroup`.",
				].join("\n\n"),
			},
		},
	},
	argTypes: {
		variant: {
			description: "`default` is borderless; `outline` adds a border for standalone use.",
			control: "inline-radio",
			options: ["default", "outline"],
			table: { defaultValue: { summary: "default" } },
		},
		size: {
			description: "Control height.",
			control: "inline-radio",
			options: ["default", "sm", "lg"],
			table: { defaultValue: { summary: "default" } },
		},
		pressed: { description: "Controlled on/off state.", control: "boolean" },
	},
} satisfies Meta<typeof UiToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A borderless toggle; play with `pressed` in the controls." } } },
	render: (args) => (
		<UiToggle aria-label="Toggle bold" {...args}>
			B
		</UiToggle>
	),
};

export const Outline: Story = {
	parameters: { docs: { description: { story: "The `outline` variant reads better as a standalone control." } } },
	render: () => (
		<UiToggle variant="outline" aria-label="Toggle italic">
			I
		</UiToggle>
	),
};
