import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiSkeleton } from "./Skeleton.tsx";

const meta = {
	title: "Root/Skeleton",
	component: UiSkeleton,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiSkeleton` is a shimmering loading placeholder — a ref-forwarding wrapper around the shadcn Skeleton.",
					"It carries no intrinsic size: give it width/height/rounding utility classes that mirror the real content so the layout doesn't shift when data arrives.",
				].join("\n\n"),
			},
		},
	},
	argTypes: {
		className: { description: "Utility classes that set the placeholder's size and shape.", control: "text" },
	},
} satisfies Meta<typeof UiSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "An avatar-plus-two-lines placeholder, matching a typical list row." } } },
	render: () => (
		<div className="flex items-center gap-3">
			<UiSkeleton className="size-10 rounded-full" />
			<div className="grid gap-2">
				<UiSkeleton className="h-4 w-40" />
				<UiSkeleton className="h-4 w-24" />
			</div>
		</div>
	),
};
