import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceChip } from "./FinanceChip.tsx";

const meta = {
	title: "Finance/Chip",
	component: FinanceChip,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceChip` is a toggleable, rounded category chip from the Quick-add panel — it wraps the shadcn Toggle. Control it with `pressed`/`onPressedChange`. Requires the `finance-theme` scope.",
			},
		},
	},
} satisfies Meta<typeof FinanceChip>;

type Story = StoryObj<typeof meta>;

export const Categories: Story = {
	render: () => {
		const Demo = () => {
			const cats = ["Groceries", "Rent", "Salary", "Transport", "Dining"];
			const [active, setActive] = useState("Salary");
			return (
				<div className="flex flex-wrap gap-2">
					{cats.map((c) => (
						<FinanceChip key={c} pressed={active === c} onPressedChange={() => setActive(c)}>
							{c}
						</FinanceChip>
					))}
				</div>
			);
		};
		return <Demo />;
	},
};

export default meta;
