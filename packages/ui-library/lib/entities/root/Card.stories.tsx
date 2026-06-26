import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiCard,
	UiCardHeader,
	UiCardTitle,
	UiCardDescription,
	UiCardContent,
	UiCardFooter,
} from "./Card.tsx";
import { UiButton } from "./Button.tsx";

const meta = {
	title: "Root/Card",
	component: UiCard,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiCard` is a bordered content surface — a ref-forwarding wrapper around the shadcn Card.",
					"Compose it from the parts: `UiCardHeader` (with `UiCardTitle` + `UiCardDescription`), `UiCardContent` for the body, and `UiCardFooter` for actions. Every part is optional — use only what a given card needs.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: {
		UiCardHeader,
		UiCardTitle,
		UiCardDescription,
		UiCardContent,
		UiCardFooter,
	},
} satisfies Meta<typeof UiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A full card: header with title/description, body content, and a footer action." } } },
	render: () => (
		<UiCard className="w-80">
			<UiCardHeader>
				<UiCardTitle>Monthly report</UiCardTitle>
				<UiCardDescription>Your spending summary for June.</UiCardDescription>
			</UiCardHeader>
			<UiCardContent className="text-sm text-muted-foreground">
				Net worth grew 2.1% this month.
			</UiCardContent>
			<UiCardFooter>
				<UiButton size="sm">View details</UiButton>
			</UiCardFooter>
		</UiCard>
	),
};
