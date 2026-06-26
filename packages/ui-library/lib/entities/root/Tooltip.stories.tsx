import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiTooltip, UiTooltipTrigger, UiTooltipContent } from "./Tooltip.tsx";
import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Tooltip",
	component: UiTooltip,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiTooltip` shows a short hint on hover/focus — a ref-forwarding wrapper around the shadcn Tooltip (Radix Tooltip), with the provider already included.",
					"Wrap the target in `UiTooltipTrigger asChild` and put the hint in `UiTooltipContent`. Keep tooltips to a few words and never put essential, non-duplicated information in them — they are unavailable on touch.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiTooltipTrigger, UiTooltipContent },
} satisfies Meta<typeof UiTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "Hover or focus the button to reveal the hint." } } },
	render: () => (
		<div className="flex justify-center p-10">
			<UiTooltip>
				<UiTooltipTrigger asChild>
					<UiButton variant="outline">Hover me</UiButton>
				</UiTooltipTrigger>
				<UiTooltipContent>Adds a new transaction</UiTooltipContent>
			</UiTooltip>
		</div>
	),
};
