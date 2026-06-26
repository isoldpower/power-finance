import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiToaster, uiToast } from "./Sonner.tsx";
import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Sonner",
	component: UiToaster,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiToaster` renders transient toast notifications — a ref-forwarding wrapper around the shadcn Sonner Toaster.",
					"Mount `UiToaster` once near the app root, then fire notifications from anywhere with the imperative `uiToast(...)` helper (also re-exported from this module). Use toasts for brief confirmations and recoverable errors — not for content the user must act on.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta<typeof UiToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "Click the button to fire a toast via `uiToast(...)`; `UiToaster` renders it." } } },
	render: () => (
		<div>
			<UiButton onClick={() => uiToast("Transaction added")}>Show toast</UiButton>
			<UiToaster />
		</div>
	),
};
