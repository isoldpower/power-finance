import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Finance/Tokens",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"The Finance design tokens — the colors, semantic accents and fonts that resolve from the `.finance-theme` scope (defined in `lib/styles/finance.css`) and flip between light and dark.",
			},
		},
	},
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Swatch = ({ name, className }: { name: string; className: string }) => (
	<div className="flex flex-col gap-1.5">
		<div className={`h-14 rounded-[var(--radius-md)] border border-border ${className}`} />
		<span className="font-numeric text-[11px] text-text-3">{name}</span>
	</div>
);

export const Colors: Story = {
	render: () => (
		<div className="grid max-w-3xl grid-cols-3 gap-4 sm:grid-cols-4">
			<Swatch name="primary" className="bg-primary" />
			<Swatch name="accent-grad" className="bg-[image:var(--accent-grad)]" />
			<Swatch name="surface" className="bg-surface" />
			<Swatch name="surface-2" className="bg-surface-2" />
			<Swatch name="pos" className="bg-pos" />
			<Swatch name="neg" className="bg-neg" />
			<Swatch name="warn" className="bg-warn" />
			<Swatch name="viol" className="bg-viol" />
			<Swatch name="pos-soft" className="bg-pos-soft" />
			<Swatch name="neg-soft" className="bg-neg-soft" />
			<Swatch name="warn-soft" className="bg-warn-soft" />
			<Swatch name="viol-soft" className="bg-viol-soft" />
		</div>
	),
};

export const Typography: Story = {
	render: () => (
		<div className="flex max-w-2xl flex-col gap-6">
			<div>
				<div className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Display · Space Grotesk
				</div>
				<div className="font-display text-4xl font-semibold tracking-tight">$18,240.30</div>
			</div>
			<div>
				<div className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Body · Hanken Grotesk
				</div>
				<p className="text-base text-foreground">
					Net worth grew 2.1% this month — assets up, liabilities flat.
				</p>
			</div>
			<div>
				<div className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Mono · JetBrains Mono
				</div>
				<div className="font-numeric text-sm text-text-2">WED · JUN 18 · 2026 · ⌘K</div>
			</div>
		</div>
	),
};

export default meta;