import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Button",
	component: UiButton,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiButton` is the primary clickable action across the app — a ref-forwarding wrapper around the shadcn Button. Import this; never reach for shadcn directly.",
					"Pick a `variant` for emphasis and a `size` for density. Set `asChild` to render a different element (for example a router `Link`) while keeping the button styling and forwarding the ref to it.",
				].join("\n\n"),
			},
		},
	},
	args: { children: "Button" },
	argTypes: {
		variant: {
			description: "Visual emphasis. `default` is the high-emphasis filled button; `link` is text-only.",
			control: "select",
			options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
			table: { defaultValue: { summary: "default" } },
		},
		size: {
			description: "Height and padding preset. Use `icon` for square, icon-only buttons.",
			control: "select",
			options: ["default", "sm", "lg", "icon"],
			table: { defaultValue: { summary: "default" } },
		},
		asChild: {
			description: "Render the single child element instead of a `<button>`, merging props onto it via Radix Slot.",
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		disabled: { description: "Disable interaction and dim the button.", control: "boolean" },
	},
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: { description: { story: "The default filled button — use for the main action in a view." } },
	},
};

export const Variants: Story = {
	parameters: {
		docs: { description: { story: "All six emphasis levels. Use one high-emphasis action per group; reserve `destructive` for irreversible actions." } },
	},
	render: () => (
		<div className="flex flex-wrap items-center gap-3">
			<UiButton>Default</UiButton>
			<UiButton variant="secondary">Secondary</UiButton>
			<UiButton variant="destructive">Destructive</UiButton>
			<UiButton variant="outline">Outline</UiButton>
			<UiButton variant="ghost">Ghost</UiButton>
			<UiButton variant="link">Link</UiButton>
		</div>
	),
};

export const Sizes: Story = {
	parameters: {
		docs: { description: { story: "The three text sizes. `icon` (not shown) is square for icon-only buttons." } },
	},
	render: () => (
		<div className="flex items-center gap-3">
			<UiButton size="sm">Small</UiButton>
			<UiButton size="default">Default</UiButton>
			<UiButton size="lg">Large</UiButton>
		</div>
	),
};

export const Disabled: Story = {
	parameters: {
		docs: { description: { story: "Non-interactive state via the native `disabled` attribute." } },
	},
	args: { disabled: true },
};
