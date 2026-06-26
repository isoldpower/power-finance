import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiSeparator } from "./Separator.tsx";

const meta = {
	title: "Root/Separator",
	component: UiSeparator,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiSeparator` is a thin dividing line — a ref-forwarding wrapper around the shadcn Separator (Radix Separator).",
					"Use it to group related content. Keep it `decorative` (the default) for purely visual rules; set `orientation=\"vertical\"` inside a flex row, where it stretches to the row height.",
				].join("\n\n"),
			},
		},
	},
	argTypes: {
		orientation: {
			description: "Axis of the divider.",
			control: "inline-radio",
			options: ["horizontal", "vertical"],
			table: { defaultValue: { summary: "horizontal" } },
		},
		decorative: {
			description: "When true (default) it is hidden from assistive tech; set false if it semantically separates content.",
			control: "boolean",
			table: { defaultValue: { summary: "true" } },
		},
	},
} satisfies Meta<typeof UiSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	parameters: { docs: { description: { story: "The default horizontal rule separating stacked items." } } },
	render: () => (
		<div className="w-64 text-sm">
			<div>Account</div>
			<UiSeparator className="my-3" />
			<div>Billing</div>
		</div>
	),
};

export const Vertical: Story = {
	parameters: { docs: { description: { story: "A vertical divider between inline items; requires a sized flex container." } } },
	render: () => (
		<div className="flex h-8 items-center gap-3 text-sm">
			<span>Profile</span>
			<UiSeparator orientation="vertical" />
			<span>Settings</span>
		</div>
	),
};
