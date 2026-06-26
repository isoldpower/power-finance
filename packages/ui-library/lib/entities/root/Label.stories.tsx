import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiLabel } from "./Label.tsx";
import { UiInput } from "./Input.tsx";

const meta = {
	title: "Root/Label",
	component: UiLabel,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiLabel` is an accessible form label — a ref-forwarding wrapper around the shadcn Label (Radix Label).",
					"Associate it with a control through matching `htmlFor` / `id`, so clicking the label focuses the field and screen readers announce the pairing.",
				].join("\n\n"),
			},
		},
	},
	argTypes: {
		htmlFor: { description: "`id` of the control this label describes.", control: "text" },
	},
} satisfies Meta<typeof UiLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A label bound to an input via `htmlFor`/`id`." } } },
	render: () => (
		<div className="grid max-w-xs gap-2">
			<UiLabel htmlFor="email">Email</UiLabel>
			<UiInput id="email" placeholder="you@example.com" />
		</div>
	),
};
