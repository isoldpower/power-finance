import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceCard } from "./FinanceCard.tsx";
import { FinanceBadge } from "./FinanceBadge.tsx";

const meta = {
	title: "Finance/Card",
	component: FinanceCard,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceCard` is the Finance surface container — it wraps the shadcn Card with the design's border, radius and shadow. Variants `default`/`elevated`/`accent`, an optional `interactive` hover, and `radius` `md`/`lg`. Compose with the re-exported `FinanceCard*` parts.",
			},
		},
	},
	argTypes: {
		variant: { control: "select", options: ["default", "elevated", "accent"] },
		interactive: { control: "boolean" },
		radius: { control: "select", options: ["md", "lg"] },
	},
} satisfies Meta<typeof FinanceCard>;

type Story = StoryObj<typeof meta>;

const Demo = () => (
	<div className="p-6">
		<div className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
			Total net worth
		</div>
		<div className="mt-2 flex items-end gap-3">
			<div className="font-display text-4xl font-semibold tracking-tight">$18,240.30</div>
			<FinanceBadge tone="pos" className="mb-1.5">+2.1%</FinanceBadge>
		</div>
	</div>
);

export const Default: Story = { args: { children: <Demo /> } };
export const Elevated: Story = { args: { variant: "elevated", children: <Demo /> } };
export const Accent: Story = { args: { variant: "accent", children: <Demo /> } };

export const Variants: Story = {
	render: () => (
		<div className="grid max-w-3xl gap-4 sm:grid-cols-3">
			<FinanceCard><Demo /></FinanceCard>
			<FinanceCard variant="elevated"><Demo /></FinanceCard>
			<FinanceCard variant="accent" interactive><Demo /></FinanceCard>
		</div>
	),
};

export default meta;