import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiPopover, UiPopoverTrigger, UiPopoverContent } from "./Popover.tsx";
import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Popover",
	component: UiPopover,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiPopover` is a floating panel anchored to a trigger — a ref-forwarding wrapper around the shadcn Popover (Radix Popover).",
					"Unlike a tooltip it holds interactive content (filters, mini-forms, pickers) and is dismissed by clicking away or pressing Escape. Use `UiPopoverTrigger asChild` for the anchor and `UiPopoverContent` for the panel. For a blocking, focus-trapping flow use `UiDialog` instead.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiPopoverTrigger, UiPopoverContent },
} satisfies Meta<typeof UiPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "Click the trigger to open the panel; click away to dismiss." } } },
	render: () => (
		<UiPopover>
			<UiPopoverTrigger asChild>
				<UiButton variant="outline">Open</UiButton>
			</UiPopoverTrigger>
			<UiPopoverContent className="text-sm">
				Popover content — filters, forms, or quick actions.
			</UiPopoverContent>
		</UiPopover>
	),
};
