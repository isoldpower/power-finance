import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiDialog,
	UiDialogTrigger,
	UiDialogContent,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogDescription,
	UiDialogFooter,
} from "./Dialog.tsx";
import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Dialog",
	component: UiDialog,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiDialog` is a focus-trapping modal — a ref-forwarding wrapper around the shadcn Dialog (Radix Dialog).",
					"Use it for flows that need the user's full attention: confirmations, short forms, destructive-action prompts. Pair `UiDialogTrigger asChild` with a `UiDialogContent` containing a `UiDialogHeader` (`UiDialogTitle` + `UiDialogDescription`) and a `UiDialogFooter` for actions. For a non-blocking inline panel use `UiPopover`.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiDialogContent, UiDialogHeader, UiDialogTitle, UiDialogDescription, UiDialogFooter },
} satisfies Meta<typeof UiDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A confirmation dialog with title, description, and Cancel / Delete actions." } } },
	render: () => (
		<UiDialog>
			<UiDialogTrigger asChild>
				<UiButton>Open dialog</UiButton>
			</UiDialogTrigger>
			<UiDialogContent>
				<UiDialogHeader>
					<UiDialogTitle>Delete wallet</UiDialogTitle>
					<UiDialogDescription>This action cannot be undone.</UiDialogDescription>
				</UiDialogHeader>
				<UiDialogFooter>
					<UiButton variant="outline">Cancel</UiButton>
					<UiButton variant="destructive">Delete</UiButton>
				</UiDialogFooter>
			</UiDialogContent>
		</UiDialog>
	),
};
