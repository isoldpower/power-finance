import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Search, Settings } from "lucide-react";

import { FinanceIconButton } from "./FinanceIconButton.tsx";
import { FinanceBadge } from "./FinanceBadge.tsx";

const meta = {
	title: "Finance/IconButton",
	component: FinanceIconButton,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceIconButton` is a square, bordered icon button for the Finance navbar (bell, theme, and similar) — it wraps the shadcn Button at `icon` size. Offers `default` and `active` variants; always give it an `aria-label`.",
			},
		},
	},
	argTypes: {
		variant: { control: "select", options: ["default", "active"] },
		size: { control: "select", options: ["sm", "md"] },
	},
} satisfies Meta<typeof FinanceIconButton>;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: <Bell />, "aria-label": "Notifications" } };

export const Row: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<FinanceIconButton aria-label="Search"><Search /></FinanceIconButton>
			<div className="relative">
				<FinanceIconButton aria-label="Notifications"><Bell /></FinanceIconButton>
				<FinanceBadge tone="solid" size="sm" className="absolute -right-1.5 -top-1.5 border-2 border-card px-1">
					3
				</FinanceBadge>
			</div>
			<FinanceIconButton variant="active" aria-label="Settings"><Settings /></FinanceIconButton>
		</div>
	),
};

export default meta;