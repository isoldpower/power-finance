import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiBadge } from "./Badge.tsx";

const meta = {
	title: "Root/Badge",
	component: UiBadge,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiBadge` is a small, non-interactive label or status pill — a ref-forwarding wrapper around the shadcn Badge.",
					"Use it for counts, statuses and tags. For an interactive badge (e.g. a removable filter), set `asChild` and render a button or link inside.",
				].join("\n\n"),
			},
		},
	},
	args: { children: "Badge" },
	argTypes: {
		variant: {
			description: "Tone of the pill. `outline` is the lowest-emphasis option.",
			control: "select",
			options: ["default", "secondary", "destructive", "outline"],
			table: { defaultValue: { summary: "default" } },
		},
		asChild: {
			description: "Render the child element instead of a `<span>` (Radix Slot) — use to make the badge a link.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
	},
} satisfies Meta<typeof UiBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "The default solid badge." } } },
};

export const Variants: Story = {
	parameters: { docs: { description: { story: "All four tones. Use `destructive` only for error/overdue states." } } },
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<UiBadge>Default</UiBadge>
			<UiBadge variant="secondary">Secondary</UiBadge>
			<UiBadge variant="destructive">Destructive</UiBadge>
			<UiBadge variant="outline">Outline</UiBadge>
		</div>
	),
};
