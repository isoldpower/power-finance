import type { ComponentProps } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarRail,
	useSidebar
} from "@internal/ui-library";

import {data, NavigationGroup, NavigationItem} from "./config.ts";
import { AppSidebarHeader } from "./SidebarHeader.tsx";
import { AppSidebarFooter } from "./SidebarFooter.tsx";
import { AppSidebarItem } from "./SidebarItem.tsx";


export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<AppSidebarHeader />
			<SidebarContent>
				<AppSidebarRecursiveItem first items={data.navMain} />
			</SidebarContent>
			<AppSidebarFooter />
			<SidebarRail />
		</Sidebar>
	)
}

function AppSidebarRecursiveItem({
	items,
	first = false
}: { items: NavigationItem[], first?: boolean }) {
	return (
		<>
			{items.map((item) => (
				item.items
					? <AppSidebarGroup item={item} />
					: <AppSidebarItem
							className={first ? 'px-2' : ''}
							title={item.title}
							to={item.url}
							icon={item.icon && <item.icon/>}/>
			))}
		</>
	)
}

function AppSidebarGroup({ item }: { item: NavigationGroup }) {
	const { open } = useSidebar();

	return (
		<SidebarGroup key={item.title}>
			{open && (
				<SidebarGroupLabel>
					{item.title}
				</SidebarGroupLabel>
			)}
			{item.items && (
				<SidebarGroupContent>
					<SidebarMenu>
						<AppSidebarRecursiveItem items={item.items} />
					</SidebarMenu>
				</SidebarGroupContent>
			)}
		</SidebarGroup>
	)
}
