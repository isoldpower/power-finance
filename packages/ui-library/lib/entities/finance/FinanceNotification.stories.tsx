import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceNotification } from "./FinanceNotification.tsx";

const meta = {
	title: "Finance/Notification",
	component: FinanceNotification,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceNotification` is an alert / warning / info row — a colored left border, an icon badge, a level tag next to the title, a mono subtitle and a timestamp. `level` drives the color and the default icon; override the icon with `icon`.",
			},
		},
	},
	args: {
		level: "info",
		title: "Transfer completed",
		subtitle: "$500.00 Main Debit → EU Savings",
		time: "1h",
	},
	argTypes: {
		level: { control: "inline-radio", options: ["alert", "warning", "info"] },
	},
} satisfies Meta<typeof FinanceNotification>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
	parameters: { docs: { description: { story: "The three severity levels stacked, as they appear in the notifications panel." } } },
	render: () => (
		<div className="flex max-w-md flex-col gap-2.5">
			<FinanceNotification level="alert" title="Webhook failing repeatedly" subtitle="wallet.deleted → 500 (5 retries)" time="5m" />
			<FinanceNotification level="warning" title="Budget 80% reached" subtitle="Groceries — $320 of $400" time="1h" />
			<FinanceNotification level="info" title="Transfer completed" subtitle="$500.00 Main Debit → EU Savings" time="1h" />
		</div>
	),
};

export default meta;