import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceColorPicker } from "./FinanceColorPicker.tsx";

const WALLET_COLORS = [
	"#6366F1", "#8B5CF6", "#EC4899", "#EF4444", "#F97316", "#F59E0B",
	"#10B981", "#14B8A6", "#06B6D4", "#3B82F6", "#64748B", "#111827",
];

const meta = {
	title: "Finance/ColorPicker",
	component: FinanceColorPicker,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceColorPicker` is a popover of palette swatches plus a hex field, built from the shadcn Popover and `FinanceInput`. The trigger doubles as the preview, showing the live swatch and hex. A custom hex only commits once it parses, so half-typed values never reach the form. Requires the `finance-theme` scope, which the popover content re-applies because it portals to the body.",
			},
		},
	},
	args: { colors: WALLET_COLORS, value: "#6366F1", onValueChange: () => undefined },
} satisfies Meta<typeof FinanceColorPicker>;

type Story = StoryObj<typeof meta>;

const Controlled = (args: React.ComponentProps<typeof FinanceColorPicker>) => {
	const [color, setColor] = React.useState<string>(args.value);

	return (
		<div className="w-72">
			<FinanceColorPicker {...args} value={color} onValueChange={setColor} />
			<div
				style={{ background: `linear-gradient(135deg, ${color}, color-mix(in oklab, ${color} 78%, black))` }}
				className="mt-4 h-[120px] rounded-[12px] shadow-[var(--shadow-lg)]"
			/>
		</div>
	);
};

export const Default: Story = { render: (args) => <Controlled {...args} /> };

export const Preselected: Story = {
	args: { value: "#10B981" },
	render: (args) => <Controlled {...args} />,
};

export const Disabled: Story = { args: { disabled: true } };

export const WithWalletPreview: Story = {
	parameters: {
		docs: { description: { story: "The wallet panels pair the picker with the gradient preview card it drives." } },
	},
	render: (args) => <Controlled {...args} />,
};

export default meta;
