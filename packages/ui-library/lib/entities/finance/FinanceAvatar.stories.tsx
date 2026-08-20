import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinanceAvatar } from "./FinanceAvatar.tsx";

const meta = {
	title: "Finance/Avatar",
	component: FinanceAvatar,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"`FinanceAvatar` is the gradient account avatar with initials — it wraps the shadcn Avatar, so a real photo passed via `src` renders with the initials as a fallback. Sizes `sm`/`md`/`lg`.",
			},
		},
	},
	args: { initials: "AR" },
	argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof FinanceAvatar>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<FinanceAvatar size="sm" initials="AR" />
			<FinanceAvatar size="md" initials="JD" />
			<FinanceAvatar size="lg" initials="MK" />
		</div>
	),
};

export const WithImage: Story = {
	args: {
		initials: "AR",
		size: "lg",
		src: "https://i.pravatar.cc/80?img=12",
	},
};

export default meta;
