import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiSheet,
	UiSheetTrigger,
	UiSheetContent,
	UiSheetHeader,
	UiSheetTitle,
	UiSheetDescription,
} from "./Sheet.tsx";
import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Sheet",
	component: UiSheet,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiSheet` is a panel that slides in from an edge — a ref-forwarding wrapper around the shadcn Sheet (built on Radix Dialog).",
					"It is a dialog optimized for larger or longer content such as filters, detail views, or side navigation. Choose the edge with `UiSheetContent`'s `side` prop (`top`/`right`/`bottom`/`left`). Reach for `UiDialog` for short, centered confirmations instead.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiSheetContent, UiSheetHeader, UiSheetTitle, UiSheetDescription },
} satisfies Meta<typeof UiSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A right-side filter panel (the default edge)." } } },
	render: () => (
		<UiSheet>
			<UiSheetTrigger asChild>
				<UiButton variant="outline">Open sheet</UiButton>
			</UiSheetTrigger>
			<UiSheetContent>
				<UiSheetHeader>
					<UiSheetTitle>Filters</UiSheetTitle>
					<UiSheetDescription>Refine the transaction list.</UiSheetDescription>
				</UiSheetHeader>
			</UiSheetContent>
		</UiSheet>
	),
};
