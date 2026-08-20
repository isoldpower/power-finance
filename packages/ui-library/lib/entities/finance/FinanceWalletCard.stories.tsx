import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceWalletCard } from "./FinanceWalletCard.tsx";


const meta = {
	title: "Finance/WalletCard",
	component: FinanceWalletCard,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceWalletCard` is the wallet summary card — a gradient card-chip, the wallet name and type, the balance rendered as a `FinanceStat`, an optional `pinned` badge and an updated-ago footer. It composes `FinanceCard`, `FinanceStat` and `FinanceBadge`; pass a custom `gradient` for the chip.",
			},
		},
	},
	args: {
		name: "Main Debit",
		type: "Debit card · USD",
		balance: "$4,820.50",
		pinned: true,
		updatedAgo: "Updated 2m ago",
	},
	argTypes: {
		pinned: { control: "boolean" },
	},
} satisfies Meta<typeof FinanceWalletCard>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="max-w-xs">
			<FinanceWalletCard {...args} />
		</div>
	),
};

export const Unpinned: Story = {
	parameters: { docs: { description: { story: "Without the pinned badge and footer." } } },
	render: () => (
		<div className="max-w-xs">
			<FinanceWalletCard name="EU Savings" type="Savings · EUR" balance="€640.00" />
		</div>
	),
};

export default meta;