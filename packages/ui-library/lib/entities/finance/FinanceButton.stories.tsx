import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceButton } from "./FinanceButton.tsx";

const meta = {
	title: "Finance/Button",
	component: FinanceButton,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceButton` is the Finance design-system action button — it wraps the shadcn Button and re-skins it to the Finance look: an indigo-gradient `primary` plus `outline`, `ghost` and `danger`. Render it inside an element carrying the `finance-theme` class.",
			},
		},
	},
	args: { children: "Approve transfer" },
	argTypes: {
		variant: { control: "select", options: ["primary", "outline", "ghost", "danger"] },
		size: { control: "select", options: ["sm", "md", "lg"] },
	},
} satisfies Meta<typeof FinanceButton>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Outline: Story = { args: { variant: "outline", children: "Dismiss" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Cancel" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete wallet" } };

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<FinanceButton variant="primary">Approve</FinanceButton>
			<FinanceButton variant="outline">Dismiss</FinanceButton>
			<FinanceButton variant="ghost">Cancel</FinanceButton>
			<FinanceButton variant="danger">Delete</FinanceButton>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<FinanceButton size="sm">Small</FinanceButton>
			<FinanceButton size="md">Medium</FinanceButton>
			<FinanceButton size="lg">Large</FinanceButton>
		</div>
	),
};

export default meta;
