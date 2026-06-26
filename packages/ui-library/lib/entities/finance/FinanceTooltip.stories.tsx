import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceTooltip } from "./FinanceTooltip.tsx";
import { FinanceBadge } from "./FinanceBadge.tsx";

const meta = {
	title: "Finance/Tooltip",
	component: FinanceTooltip,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceTooltip` is the dark Finance hint bubble — it wraps the shadcn Tooltip into a single-prop API (`content` plus a trigger child). Keep hints short. Requires the `finance-theme` scope.",
			},
		},
	},
	args: {
		content: "Assets − liabilities = net worth",
		children: <FinanceBadge tone="accent" className="cursor-help">Equity</FinanceBadge>,
	},
} satisfies Meta<typeof FinanceTooltip>;

type Story = StoryObj<typeof meta>;

export const Hint: Story = {
	render: (args) => (
		<div className="flex justify-center p-12">
			<FinanceTooltip {...args} />
		</div>
	),
};

export default meta;
