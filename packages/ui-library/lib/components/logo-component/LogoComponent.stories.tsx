import type { Meta, StoryObj } from "@storybook/react-vite";

import { LogoComponent } from "./LogoComponent.tsx";

const meta = {
	title: "Components/LogoComponent",
	component: LogoComponent,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`LogoComponent` renders the company logo mark, optionally followed by the wordmark.",
					"Use the icon-only form in tight spots (a collapsed sidebar, a mobile header) and the `withText` form where there is room for the full brand.",
				].join("\n\n"),
			},
		},
	},
	argTypes: {
		withText: {
			description: "Show the wordmark next to the mark.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
	},
} satisfies Meta<typeof LogoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mark: Story = {
	parameters: { docs: { description: { story: "Icon only — for collapsed or compact layouts." } } },
};

export const WithText: Story = {
	parameters: { docs: { description: { story: "Mark plus wordmark — for headers and splash screens." } } },
	args: { withText: true },
};
