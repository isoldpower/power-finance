import type { Meta, StoryObj } from "@storybook/react-vite";
import { CreditCard, LogOut, Settings, User } from "lucide-react";

import { FinanceMenu, FinanceMenuTrigger, FinanceMenuContent, FinanceMenuItem } from "./FinanceMenu.tsx";
import { FinanceAvatar } from "./FinanceAvatar.tsx";

const meta = {
	title: "Finance/Menu",
	component: FinanceMenuContent,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceMenu` is the Finance dropdown surface used by the navbar bell, account and picker menus — it wraps the shadcn Popover. Compose `FinanceMenuTrigger`, `FinanceMenuContent` and `FinanceMenuItem`s. Requires the `finance-theme` scope.",
			},
		},
	},
} satisfies Meta<typeof FinanceMenuContent>;

type Story = StoryObj<typeof meta>;

export const AccountMenu: Story = {
	render: () => (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				<FinanceAvatar initials="AR" />
			</FinanceMenuTrigger>
			<FinanceMenuContent className="min-w-56">
				<FinanceMenuItem><User className="size-4 text-text-3" /> Profile</FinanceMenuItem>
				<FinanceMenuItem><CreditCard className="size-4 text-text-3" /> Wallets</FinanceMenuItem>
				<FinanceMenuItem><Settings className="size-4 text-text-3" /> Settings</FinanceMenuItem>
				<FinanceMenuItem className="text-neg"><LogOut className="size-4" /> Sign out</FinanceMenuItem>
			</FinanceMenuContent>
		</FinanceMenu>
	),
};

export default meta;
