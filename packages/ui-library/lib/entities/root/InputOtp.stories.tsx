import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiInputOTP, UiInputOTPGroup, UiInputOTPSlot } from "./InputOtp.tsx";

const meta = {
	title: "Root/InputOTP",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiInputOTP` is a one-time-passcode field — a ref-forwarding wrapper around the shadcn InputOTP (input-otp).",
					"Set `maxLength` to the code length and render that many `UiInputOTPSlot`s (by `index`) inside a `UiInputOTPGroup`. Split long codes with `UiInputOTPSeparator`. Use for 2FA / verification codes; it handles paste and arrow-key navigation for you.",
				].join("\n\n"),
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A six-digit verification field in a single group." } } },
	render: () => (
		<UiInputOTP maxLength={6}>
			<UiInputOTPGroup>
				<UiInputOTPSlot index={0} />
				<UiInputOTPSlot index={1} />
				<UiInputOTPSlot index={2} />
				<UiInputOTPSlot index={3} />
				<UiInputOTPSlot index={4} />
				<UiInputOTPSlot index={5} />
			</UiInputOTPGroup>
		</UiInputOTP>
	),
};
