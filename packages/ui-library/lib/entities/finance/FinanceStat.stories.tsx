import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceStat } from "./FinanceStat.tsx";

const meta = {
	title: "Finance/Stat",
	component: FinanceStat,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceStat` is a KPI block — a mono, uppercase label above a large Space Grotesk value. Use it for wallet balances and the ledger's Assets − Liabilities = Equity row. `size` controls the value scale.",
			},
		},
	},
	args: { label: "Balance", value: "$4,820.50" },
	argTypes: {
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
	},
} satisfies Meta<typeof FinanceStat>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ledger: Story = {
	parameters: { docs: { description: { story: "The double-entry identity rendered as three stats." } } },
	render: () => (
		<div className="flex flex-wrap items-center gap-5">
			<FinanceStat size="md" label="Assets" value="$18,880.50" />
			<span className="text-lg text-text-3">−</span>
			<FinanceStat size="md" label="Liabilities" value="$640.20" />
			<span className="text-lg text-text-3">=</span>
			<FinanceStat size="md" label="Equity" value="$18,240.30" />
		</div>
	),
};

export default meta;
