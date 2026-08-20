import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppLoader } from "./AppLoader.tsx";

const meta = {
	title: "Components/AppLoader",
	component: AppLoader,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: [
					"`AppLoader` is the branded full-page loading state. It takes no props — render it while a route, chunk, or critical query is pending.",
					"It is wired in as the router's `pendingComponent`; pair it with `AppError` for the failure state.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta<typeof AppLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "The loading screen shown while a route or query resolves." } } },
};
