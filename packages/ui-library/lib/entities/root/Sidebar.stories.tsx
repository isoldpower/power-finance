import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	UiSidebarProvider,
	UiSidebar,
	UiSidebarHeader,
	UiSidebarContent,
	UiSidebarGroup,
	UiSidebarGroupLabel,
	UiSidebarGroupContent,
	UiSidebarMenu,
	UiSidebarMenuItem,
	UiSidebarMenuButton,
	UiSidebarFooter,
	UiSidebarInset,
	UiSidebarTrigger,
} from "./Sidebar.tsx";

const meta = {
	title: "Root/Sidebar",
	component: UiSidebar,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: [
					"`UiSidebar` is the collapsible application navigation rail — a ref-forwarding wrapper around the shadcn Sidebar.",
					"Wrap the whole app in `UiSidebarProvider`, which owns the open/collapsed state (read it with the `useUiSidebar` hook). Build the rail from `UiSidebarHeader`, grouped `UiSidebarMenuButton`s, and `UiSidebarFooter`; place page content in `UiSidebarInset` and a `UiSidebarTrigger` to toggle it.",
				].join("\n\n"),
			},
		},
	},
	subcomponents: { UiSidebarProvider, UiSidebarMenuButton, UiSidebarTrigger, UiSidebarInset },
} satisfies Meta<typeof UiSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "A nav rail with a grouped menu and a content area; use the trigger to collapse it." } } },
	render: () => (
		<UiSidebarProvider>
			<UiSidebar>
				<UiSidebarHeader className="px-3 py-2 font-semibold">Power Finance</UiSidebarHeader>
				<UiSidebarContent>
					<UiSidebarGroup>
						<UiSidebarGroupLabel>Navigation</UiSidebarGroupLabel>
						<UiSidebarGroupContent>
							<UiSidebarMenu>
								<UiSidebarMenuItem>
									<UiSidebarMenuButton>Dashboard</UiSidebarMenuButton>
								</UiSidebarMenuItem>
								<UiSidebarMenuItem>
									<UiSidebarMenuButton>Wallets</UiSidebarMenuButton>
								</UiSidebarMenuItem>
								<UiSidebarMenuItem>
									<UiSidebarMenuButton>Settings</UiSidebarMenuButton>
								</UiSidebarMenuItem>
							</UiSidebarMenu>
						</UiSidebarGroupContent>
					</UiSidebarGroup>
				</UiSidebarContent>
				<UiSidebarFooter className="px-3 py-2 text-xs text-muted-foreground">v1.1.0</UiSidebarFooter>
			</UiSidebar>
			<UiSidebarInset className="p-4">
				<UiSidebarTrigger />
			</UiSidebarInset>
		</UiSidebarProvider>
	),
};
