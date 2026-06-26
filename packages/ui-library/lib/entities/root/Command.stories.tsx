import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiCommand,
	UiCommandInput,
	UiCommandList,
	UiCommandEmpty,
	UiCommandGroup,
	UiCommandItem,
} from "./Command.tsx";

const meta = {
	title: "Root/Command",
	component: UiCommand,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiCommand` is a fast, filterable list — a ref-forwarding wrapper around the shadcn Command (cmdk).",
					"Use it for command palettes and search-driven pickers. `UiCommandInput` filters the `UiCommandItem`s as you type; group them with `UiCommandGroup` and show `UiCommandEmpty` when nothing matches. Drop it inside a dialog for a ⌘K palette.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiCommandInput, UiCommandList, UiCommandGroup, UiCommandItem },
} satisfies Meta<typeof UiCommand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A bordered palette — type in the input to filter the actions." } } },
	render: () => (
		<UiCommand className="max-w-sm rounded-lg border">
			<UiCommandInput placeholder="Type a command or search…" />
			<UiCommandList>
				<UiCommandEmpty>No results found.</UiCommandEmpty>
				<UiCommandGroup heading="Actions">
					<UiCommandItem>Add transaction</UiCommandItem>
					<UiCommandItem>New wallet</UiCommandItem>
					<UiCommandItem>Open settings</UiCommandItem>
				</UiCommandGroup>
			</UiCommandList>
		</UiCommand>
	),
};
