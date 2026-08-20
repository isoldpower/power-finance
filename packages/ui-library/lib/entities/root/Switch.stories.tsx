import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiSwitch } from "./Switch.tsx";
import { UiLabel } from "./Label.tsx";

const meta = {
	title: "Root/Switch",
	component: UiSwitch,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiSwitch` is an on/off toggle — a ref-forwarding wrapper around the shadcn Switch (Radix Switch).",
					"Use it for instant, self-applying settings (no Save needed). Control it with `checked` + `onCheckedChange`, and label it with `UiLabel`.",
				].join("\n\n"),
			},
		},
	},
	argTypes: {
		checked: { description: "Controlled on/off state.", control: "boolean" },
		disabled: { description: "Disable the toggle.", control: "boolean" },
	},
} satisfies Meta<typeof UiSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A labelled toggle. Clicking the label flips the switch." } } },
	render: () => (
		<div className="flex items-center gap-2">
			<UiSwitch id="airplane" />
			<UiLabel htmlFor="airplane">Airplane mode</UiLabel>
		</div>
	),
};
