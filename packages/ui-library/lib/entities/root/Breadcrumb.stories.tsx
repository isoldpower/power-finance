import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiBreadcrumb,
	UiBreadcrumbList,
	UiBreadcrumbItem,
	UiBreadcrumbLink,
	UiBreadcrumbPage,
	UiBreadcrumbSeparator,
} from "./Breadcrumb.tsx";

const meta = {
	title: "Root/Breadcrumb",
	component: UiBreadcrumb,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiBreadcrumb` shows the path to the current page — a ref-forwarding wrapper around the shadcn Breadcrumb.",
					"Inside a `UiBreadcrumbList`, render `UiBreadcrumbLink`s for ancestor pages and a single `UiBreadcrumbPage` (non-link, marked current) for where the user is, divided by `UiBreadcrumbSeparator`. Use `UiBreadcrumbLink asChild` to delegate to a router link.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiBreadcrumbList, UiBreadcrumbItem, UiBreadcrumbLink, UiBreadcrumbPage, UiBreadcrumbSeparator },
} satisfies Meta<typeof UiBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A three-level trail ending on the current page (`Wallets`)." } } },
	render: () => (
		<UiBreadcrumb>
			<UiBreadcrumbList>
				<UiBreadcrumbItem>
					<UiBreadcrumbLink href="#">Home</UiBreadcrumbLink>
				</UiBreadcrumbItem>
				<UiBreadcrumbSeparator />
				<UiBreadcrumbItem>
					<UiBreadcrumbLink href="#">Dashboard</UiBreadcrumbLink>
				</UiBreadcrumbItem>
				<UiBreadcrumbSeparator />
				<UiBreadcrumbItem>
					<UiBreadcrumbPage>Wallets</UiBreadcrumbPage>
				</UiBreadcrumbItem>
			</UiBreadcrumbList>
		</UiBreadcrumb>
	),
};
