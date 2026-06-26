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
					"`FinanceSegmented` is the Finance segmented control — a single-select toggle group styled as the navbar tabs, dashboard period switcher and quick-add type toggle. Render `FinanceSegmentedItem`s with unique `value`s and drive it with `value`/`onValueChange`.",
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

export default meta;
