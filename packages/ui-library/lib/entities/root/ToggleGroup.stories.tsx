import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiToggleGroup, UiToggleGroupItem } from "./ToggleGroup.tsx";

const meta = {
	title: "Root/ToggleGroup",
	component: UiToggleGroup,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiToggleGroup` is a set of related toggles — a ref-forwarding wrapper around the shadcn ToggleGroup (Radix Toggle Group).",
					"`type=\"single\"` behaves like a segmented control (one active option, like an alignment picker); `type=\"multiple\"` lets several be active at once (like text-formatting). Each option is a `UiToggleGroupItem` with a unique `value`.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiToggleGroupItem },
	args: { type: "single" },
	argTypes: {
		type: {
			description: "`single` allows one active item; `multiple` allows many.",
			control: "inline-radio",
			options: ["single", "multiple"],
		},
	},
} satisfies Meta<typeof UiToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
	parameters: { docs: { description: { story: "Segmented control — exactly one option active at a time." } } },
	render: () => (
		<UiToggleGroup type="single" defaultValue="center">
			<UiToggleGroupItem value="left">Left</UiToggleGroupItem>
			<UiToggleGroupItem value="center">Center</UiToggleGroupItem>
			<UiToggleGroupItem value="right">Right</UiToggleGroupItem>
		</UiToggleGroup>
	),
};

export const Multiple: Story = {
	parameters: { docs: { description: { story: "Independent toggles — any number can be active." } } },
	render: () => (
		<UiToggleGroup type="multiple">
			<UiToggleGroupItem value="bold">Bold</UiToggleGroupItem>
			<UiToggleGroupItem value="italic">Italic</UiToggleGroupItem>
			<UiToggleGroupItem value="underline">Underline</UiToggleGroupItem>
		</UiToggleGroup>
	),
};
