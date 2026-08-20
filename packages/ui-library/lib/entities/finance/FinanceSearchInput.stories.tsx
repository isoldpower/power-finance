import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, X } from "lucide-react";

import { FinanceSearchInput, FinanceSearchInputField } from "./FinanceSearchInput.tsx";
import { FinanceBadge } from "./FinanceBadge.tsx";

const meta = {
	title: "Finance/SearchInput",
	component: FinanceSearchInput,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceSearchInput` is the Finance search field — a bordered row whose border tints `--accent-border` on focus. Input props (`value`, `onChange`, `placeholder`, …) go on the root, which passes them via context to `FinanceSearchInputField`; anything else rendered as children — icons, toggles, badges — becomes an inline slot in document order. Requires the `finance-theme` scope.",
			},
		},
	},
	args: { placeholder: "Search wallets…", children: null },
} satisfies Meta<typeof FinanceSearchInput>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<FinanceSearchInput {...args} className="max-w-xs">
			<Search className="size-3.5 flex-none text-text-3" />
			<FinanceSearchInputField />
		</FinanceSearchInput>
	),
};

export const WithTrailingSlots: Story = {
	parameters: { docs: { description: { story: "Children after the field render on the right — a result-count badge, a clear button." } } },
	render: (args) => (
		<FinanceSearchInput {...args} defaultValue="visa" className="max-w-xs">
			<Search className="size-3.5 flex-none text-text-3" />
			<FinanceSearchInputField />
			<FinanceBadge>3</FinanceBadge>
			<X className="size-3.5 flex-none cursor-pointer text-text-3" />
		</FinanceSearchInput>
	),
};

export default meta;
