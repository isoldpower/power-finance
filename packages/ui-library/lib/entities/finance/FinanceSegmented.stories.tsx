import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceSegmented, FinanceSegmentedItem } from "./FinanceSegmented.tsx";

const meta = {
	title: "Finance/Segmented",
	component: FinanceSegmented,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceSegmented` is the Finance segmented control — a single-select toggle group styled as the navbar tabs, dashboard period switcher and quick-add type toggle. Render `FinanceSegmentedItem`s with unique `value`s and drive it with `value`/`onValueChange`. Pass `accent` on the items for the solid-indigo active style (the transaction-type toggle); the default active style is the white surface pill.",
			},
		},
	},
} satisfies Meta<typeof FinanceSegmented>;

type Story = StoryObj<typeof meta>;

export const NavTabs: Story = {
	render: () => {
		const Demo = () => {
			const [tab, setTab] = useState("dashboard");
			return (
				<FinanceSegmented value={tab} onValueChange={(v) => v && setTab(v)}>
					<FinanceSegmentedItem value="dashboard">Dashboard</FinanceSegmentedItem>
					<FinanceSegmentedItem value="management">Management</FinanceSegmentedItem>
					<FinanceSegmentedItem value="planning">Planning</FinanceSegmentedItem>
				</FinanceSegmented>
			);
		};
		return <Demo />;
	},
};

export const Period: Story = {
	render: () => {
		const Demo = () => {
			const [p, setP] = useState("M");
			return (
				<FinanceSegmented value={p} onValueChange={(v) => v && setP(v)}>
					{["D", "W", "M", "Y"].map((x) => (
						<FinanceSegmentedItem key={x} value={x}>{x}</FinanceSegmentedItem>
					))}
				</FinanceSegmented>
			);
		};
		return <Demo />;
	},
};

export const AccentType: Story = {
	parameters: { docs: { description: { story: "The quick-add transaction-type toggle — `accent` items fill with indigo when active." } } },
	render: () => {
		const Demo = () => {
			const [type, setType] = useState("expense");
			return (
				<FinanceSegmented value={type} onValueChange={(v) => v && setType(v)}>
					<FinanceSegmentedItem accent value="expense">Expense</FinanceSegmentedItem>
					<FinanceSegmentedItem accent value="income">Income</FinanceSegmentedItem>
					<FinanceSegmentedItem accent value="transfer">Transfer</FinanceSegmentedItem>
				</FinanceSegmented>
			);
		};
		return <Demo />;
	},
};

export default meta;
