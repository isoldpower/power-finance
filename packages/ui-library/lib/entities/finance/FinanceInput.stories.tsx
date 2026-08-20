import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceInput } from "./FinanceInput.tsx";

const meta = {
	title: "Finance/Input",
	component: FinanceInput,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceInput` is the Finance text field — it wraps the shadcn Input. The `bare` variant is the large, borderless amount input used in Quick-add. Requires the `finance-theme` scope.",
			},
		},
	},
	args: { placeholder: "Search transactions…" },
	argTypes: { variant: { control: "select", options: ["default", "bare"] } },
} satisfies Meta<typeof FinanceInput>;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };

export const Bare: Story = {
	render: () => (
		<div className="flex max-w-xs items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-3.5 py-2.5">
			<span className="font-display text-3xl font-semibold text-pos">$</span>
			<FinanceInput variant="bare" defaultValue="240.00" inputMode="decimal" className="text-pos" />
		</div>
	),
};

export default meta;