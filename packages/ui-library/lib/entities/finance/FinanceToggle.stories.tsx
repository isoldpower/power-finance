import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "lucide-react";

import { FinanceToggle } from "./FinanceToggle.tsx";
import { FinanceSearchInput, FinanceSearchInputField } from "./FinanceSearchInput.tsx";

const meta = {
	title: "Finance/Toggle",
	component: FinanceToggle,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceToggle` is a compact pressable control — muted when off, tinted `--accent-soft` with `--primary` text when on. Wraps the shadcn Toggle, so it takes `pressed` / `onPressedChange` / `defaultPressed`. Built for inline spots like `FinanceSearchInput` slots. Requires the `finance-theme` scope.",
			},
		},
	},
	args: { children: "Aa", title: "Match case" },
} satisfies Meta<typeof FinanceToggle>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = { args: { defaultPressed: true } };

export const InSearchInput: Story = {
	parameters: { docs: { description: { story: "The wallet browser's match-case toggle trailing the field inside a search input." } } },
	render: (args) => (
		<FinanceSearchInput placeholder="Search wallets…" className="max-w-xs">
			<Search className="size-3.5 flex-none text-text-3" />
			<FinanceSearchInputField />
			<FinanceToggle {...args} />
		</FinanceSearchInput>
	),
};

export default meta;
