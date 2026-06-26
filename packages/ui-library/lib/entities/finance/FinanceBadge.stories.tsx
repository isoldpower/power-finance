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
					"`FinanceBadge` is a soft, rounded status pill in the Finance palette — tones `pos`/`neg`/`warn`/`viol`/`accent`/`neutral`/`solid`, with an optional leading `dot`. Use it for transaction signs, ledger states and counts. Requires the `finance-theme` scope.",
			},
		},
	},
	args: { children: "+12.4%" },
	argTypes: {
		tone: {
			control: "select",
			options: ["pos", "neg", "warn", "viol", "accent", "neutral", "solid"],
		},
		size: { control: "select", options: ["sm", "md"] },
	},
} satisfies Meta<typeof FinanceBadge>;

type Story = StoryObj<typeof meta>;

export const Positive: Story = { args: { tone: "pos", children: "+12.4%" } };
export const Negative: Story = { args: { tone: "neg", children: "−4.1%" } };

export const AllTones: Story = {
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

export default meta;
