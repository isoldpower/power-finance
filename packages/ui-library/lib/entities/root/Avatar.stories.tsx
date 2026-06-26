import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiAvatar, UiAvatarImage, UiAvatarFallback } from "./Avatar.tsx";

const meta = {
	title: "Root/Avatar",
	component: UiAvatar,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiAvatar` shows a user's image with a graceful fallback — a ref-forwarding wrapper around the shadcn Avatar (Radix Avatar).",
					"Compose `UiAvatarImage` for the photo and `UiAvatarFallback` for initials or an icon. The fallback renders while the image loads and stays if it errors, so an avatar is never blank.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiAvatarImage, UiAvatarFallback },
} satisfies Meta<typeof UiAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	parameters: { docs: { description: { story: "Image loads successfully; the fallback is hidden." } } },
	render: () => (
		<UiAvatar>
			<UiAvatarImage src="https://i.pravatar.cc/80?img=12" alt="User" />
			<UiAvatarFallback>AR</UiAvatarFallback>
		</UiAvatar>
	),
};

export const Fallback: Story = {
	parameters: { docs: { description: { story: "No image provided — initials fill in. This is also what shows on a load error." } } },
	render: () => (
		<UiAvatar>
			<UiAvatarFallback>JD</UiAvatarFallback>
		</UiAvatar>
	),
};
