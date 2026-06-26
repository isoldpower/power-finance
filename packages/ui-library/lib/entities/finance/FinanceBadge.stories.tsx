import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceBadge } from "./FinanceBadge.tsx";

const meta = {
	title: "Finance/Badge",
	component: FinanceBadge,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceBadge` is a rounded status pill in the Finance palette — tones `pos`/`neg`/`warn`/`viol`/`accent`/`neutral`/`solid` in either a `soft` (filled) or `outline` `appearance`, with an optional leading `dot`. Use it for transaction signs, ledger states, severity levels and counts. Requires the `finance-theme` scope.",
			},
		},
	},
	args: { children: "+12.4%" },
	argTypes: {
		tone: {
			control: "select",
			options: ["pos", "neg", "warn", "viol", "accent", "neutral", "solid"],
		},
		appearance: { control: "inline-radio", options: ["soft", "outline"] },
		size: { control: "select", options: ["sm", "md"] },
	},
} satisfies Meta<typeof FinanceBadge>;

type Story = StoryObj<typeof meta>;

export const Positive: Story = { args: { tone: "pos", children: "+12.4%" } };
export const Negative: Story = { args: { tone: "neg", children: "−4.1%" } };

export const AllTones: Story = {
	parameters: { docs: { description: { story: "Every tone in the default `soft` appearance." } } },
	render: () => (
		<div className="flex flex-wrap items-center gap-2.5">
			<FinanceBadge tone="pos" dot>balanced</FinanceBadge>
			<FinanceBadge tone="neg">overdue</FinanceBadge>
			<FinanceBadge tone="warn">review</FinanceBadge>
			<FinanceBadge tone="viol">scheduled</FinanceBadge>
			<FinanceBadge tone="accent">double-entry</FinanceBadge>
			<FinanceBadge tone="neutral">draft</FinanceBadge>
			<FinanceBadge tone="solid">3</FinanceBadge>
		</div>
	),
};

export const Levels: Story = {
	parameters: { docs: { description: { story: "The Style Tile severity badges — `outline` appearance for Alert / Warning / Info, plus the filled Active and neutral Paused." } } },
	render: () => (
		<div className="flex flex-wrap items-center gap-2.5">
			<FinanceBadge tone="pos" dot>Active</FinanceBadge>
			<FinanceBadge tone="neutral">Paused</FinanceBadge>
			<FinanceBadge tone="neg" appearance="outline">Alert</FinanceBadge>
			<FinanceBadge tone="warn" appearance="outline">Warning</FinanceBadge>
			<FinanceBadge tone="accent" appearance="outline">Info</FinanceBadge>
		</div>
	),
};

export default meta;
