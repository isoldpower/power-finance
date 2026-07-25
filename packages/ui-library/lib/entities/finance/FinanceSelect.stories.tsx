import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	FinanceSelect,
	FinanceSelectContent,
	FinanceSelectItem,
	FinanceSelectTrigger,
	FinanceSelectValue,
} from "./FinanceSelect.tsx";

const meta = {
	title: "Finance/Select",
	component: FinanceSelectTrigger,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceSelect` is the Finance filter dropdown — a compact trigger and a `--shadow-lg` popup where the checked option is tinted `--accent-soft` with `--primary` text. Wraps the shadcn/Radix Select. Compose `FinanceSelectTrigger` + `FinanceSelectValue`, `FinanceSelectContent` and `FinanceSelectItem`s. Requires the `finance-theme` scope.",
			},
		},
	},
} satisfies Meta<typeof FinanceSelectTrigger>;

type Story = StoryObj<typeof meta>;

export const TypeFilter: Story = {
	render: () => (
		<FinanceSelect defaultValue="all">
			<FinanceSelectTrigger className="w-40">
				<FinanceSelectValue />
			</FinanceSelectTrigger>
			<FinanceSelectContent>
				<FinanceSelectItem value="all">All types</FinanceSelectItem>
				<FinanceSelectItem value="debit">Debit card</FinanceSelectItem>
				<FinanceSelectItem value="savings">Savings</FinanceSelectItem>
				<FinanceSelectItem value="credit">Credit card</FinanceSelectItem>
				<FinanceSelectItem value="cash">Cash</FinanceSelectItem>
			</FinanceSelectContent>
		</FinanceSelect>
	),
};

export const SortPair: Story = {
	parameters: { docs: { description: { story: "The wallet browser's type + sort pair, each stretching to half the row." } } },
	render: () => (
		<div className="flex w-80 gap-2">
			<FinanceSelect defaultValue="all">
				<FinanceSelectTrigger className="flex-1">
					<FinanceSelectValue />
				</FinanceSelectTrigger>
				<FinanceSelectContent>
					<FinanceSelectItem value="all">All types</FinanceSelectItem>
					<FinanceSelectItem value="debit">Debit card</FinanceSelectItem>
					<FinanceSelectItem value="credit">Credit card</FinanceSelectItem>
				</FinanceSelectContent>
			</FinanceSelect>
			<FinanceSelect defaultValue="name">
				<FinanceSelectTrigger className="flex-1">
					<FinanceSelectValue />
				</FinanceSelectTrigger>
				<FinanceSelectContent>
					<FinanceSelectItem value="name">Name A–Z</FinanceSelectItem>
					<FinanceSelectItem value="balance-desc">Balance: high → low</FinanceSelectItem>
					<FinanceSelectItem value="balance-asc">Balance: low → high</FinanceSelectItem>
				</FinanceSelectContent>
			</FinanceSelect>
		</div>
	),
};

export default meta;
