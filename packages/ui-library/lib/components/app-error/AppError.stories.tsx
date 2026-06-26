import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppError } from "./AppError.tsx";

const meta = {
	title: "Components/AppError",
	component: AppError,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: [
					"`AppError` is the branded full-page error state. It takes no props — render it as the fallback for a route or error boundary when something fails to load.",
					"It is wired in as the router's `errorComponent`; pair it with `AppLoader` for the pending state.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta<typeof AppError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "The error screen shown when a route or boundary fails." } } },
};
