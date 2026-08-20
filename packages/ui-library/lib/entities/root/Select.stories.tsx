import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiSelect,
	UiSelectTrigger,
	UiSelectValue,
	UiSelectContent,
	UiSelectItem,
} from "./Select.tsx";

const meta = {
	title: "Root/Select",
	component: UiSelect,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiSelect` is a single-choice dropdown — a ref-forwarding wrapper around the shadcn Select (Radix Select).",
					"`UiSelectTrigger` + `UiSelectValue` show the current selection (with a `placeholder` when empty); options are `UiSelectItem`s inside `UiSelectContent`, each with a unique `value`. Drive it with `value` + `onValueChange`. For free-text search over many options, use `UiCommand` instead.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiSelectTrigger, UiSelectValue, UiSelectContent, UiSelectItem },
} satisfies Meta<typeof UiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "An empty select showing its placeholder until a wallet is chosen." } } },
	render: () => (
		<UiSelect>
			<UiSelectTrigger className="w-56">
				<UiSelectValue placeholder="Select a wallet" />
			</UiSelectTrigger>
			<UiSelectContent>
				<UiSelectItem value="cash">Cash</UiSelectItem>
				<UiSelectItem value="visa">Visa Credit</UiSelectItem>
				<UiSelectItem value="savings">Savings</UiSelectItem>
			</UiSelectContent>
		</UiSelect>
	),
};
