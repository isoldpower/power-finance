import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceMoney } from "./FinanceMoney.tsx";

const meta = {
	title: "Finance/Money",
	component: FinanceMoney,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceMoney` renders a monetary value in the Finance display type with tabular figures, so stacked numbers align on the decimal. Set `tone` (`pos`/`neg`/`neutral`/`muted`) for income / expense / transfer coloring and `size` for hierarchy (up to `display` for the hero KPI). It is presentational — format the number yourself.",
			},
		},
	},
	args: { children: "$18,240.30" },
	argTypes: {
		tone: { control: "inline-radio", options: ["pos", "neg", "neutral", "muted"] },
		size: { control: "select", options: ["sm", "md", "lg", "xl", "display"] },
	},
} satisfies Meta<typeof FinanceMoney>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
	parameters: { docs: { description: { story: "Income, expense, transfer and neutral — right-aligned so the figures line up." } } },
	render: () => (
		<div className="flex flex-col items-end gap-1 text-right">
			<FinanceMoney tone="pos">+3,200.00</FinanceMoney>
			<FinanceMoney tone="neg">−86.40</FinanceMoney>
			<FinanceMoney tone="muted">500.00 ⇄</FinanceMoney>
			<FinanceMoney>12,400.00</FinanceMoney>
		</div>
	),
};

export const Sizes: Story = {
	parameters: { docs: { description: { story: "From inline `sm` up to the `display` hero figure." } } },
	render: () => (
		<div className="flex flex-wrap items-baseline gap-4">
			<FinanceMoney size="sm">1,240.00</FinanceMoney>
			<FinanceMoney size="md">1,240.00</FinanceMoney>
			<FinanceMoney size="lg">1,240.00</FinanceMoney>
			<FinanceMoney size="xl">1,240.00</FinanceMoney>
			<FinanceMoney size="display" tone="pos">$18,240.30</FinanceMoney>
		</div>
	),
};

export default meta;
