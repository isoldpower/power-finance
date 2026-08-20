import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceNotification } from "./FinanceNotification.tsx";
import { FinanceIconButton } from "./FinanceIconButton.tsx";

const meta = {
	title: "Finance/Notification",
	component: FinanceNotification,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceNotification` is an alert / warning / info row — a colored left border, an icon badge, a level tag next to the title, a mono subtitle and a timestamp. `level` drives the color and the default icon; override the icon with `icon`. Pass `action` to stack a control (e.g. a seen toggle) under the timestamp.",
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

export const WithAction: Story = {
	parameters: { docs: { description: { story: "A trailing `action` slot — here a seen / unseen toggle rendered under the timestamp." } } },
	render: () => (
		<div className="flex max-w-md flex-col gap-2.5">
			<FinanceNotification
				level="warning"
				title="Budget 80% reached"
				subtitle="Groceries — $320 of $400"
				time="1h"
				action={
					<FinanceIconButton size="sm" aria-label="Mark as read" className="size-7">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
							<circle cx="12" cy="12" r="8" />
						</svg>
					</FinanceIconButton>
				}
			/>
			<FinanceNotification
				level="info"
				title="Salary received"
				subtitle="+$4,200.00 deposited to Main Checking"
				time="Yesterday"
				className="opacity-60"
				action={
					<FinanceIconButton size="sm" variant="active" aria-label="Mark as unread" className="size-7">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
							<path d="m5 12.5 4.5 4.5L19 7.5" />
						</svg>
					</FinanceIconButton>
				}
			/>
		</div>
	),
};

export default meta;