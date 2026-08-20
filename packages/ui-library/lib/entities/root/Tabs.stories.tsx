import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiTabs, UiTabsList, UiTabsTrigger, UiTabsContent } from "./Tabs.tsx";

const meta = {
	title: "Root/Tabs",
	component: UiTabs,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiTabs` switches between sibling panels in place — a ref-forwarding wrapper around the shadcn Tabs (Radix Tabs).",
					"Put the triggers in a `UiTabsList`, and give each `UiTabsTrigger` a `value` that matches a `UiTabsContent`. Use `defaultValue` for uncontrolled tabs or `value` + `onValueChange` to control them.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiTabsList, UiTabsTrigger, UiTabsContent },
} satisfies Meta<typeof UiTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "Two panels selected by their matching triggers; starts on `overview`." } } },
	render: () => (
		<UiTabs defaultValue="overview" className="w-80">
			<UiTabsList>
				<UiTabsTrigger value="overview">Overview</UiTabsTrigger>
				<UiTabsTrigger value="activity">Activity</UiTabsTrigger>
			</UiTabsList>
			<UiTabsContent value="overview" className="pt-3 text-sm">
				Overview content.
			</UiTabsContent>
			<UiTabsContent value="activity" className="pt-3 text-sm">
				Activity content.
			</UiTabsContent>
		</UiTabs>
	),
};
