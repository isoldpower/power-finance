import type { ComponentProps } from "react";
import {
	UiSidebar,
	UiSidebarContent,
	UiSidebarGroup,
	UiSidebarGroupContent,
	UiSidebarGroupLabel,
	UiSidebarMenu,
	UiSidebarRail,
	useUiSidebar
} from "@internal/ui-library";

import {data, NavigationGroup, NavigationItem} from "./config.ts";
import { AppSidebarHeader } from "./SidebarHeader.tsx";
import { AppSidebarFooter } from "./SidebarFooter.tsx";
import { AppSidebarItem } from "./SidebarItem.tsx";


export function AppSidebar({ ...props }: ComponentProps<typeof UiSidebar>) {
	return (
		<UiSidebar collapsible="icon" {...props}>
			<AppSidebarHeader />
			<UiSidebarContent>
				<AppSidebarRecursiveItem first items={data.navMain} />
			</UiSidebarContent>
			<AppSidebarFooter />
			<UiSidebarRail />
		</UiSidebar>
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
	const { open } = useUiSidebar();

	return (
		<UiSidebarGroup key={item.title}>
			{open && (
				<UiSidebarGroupLabel>
					{item.title}
				</UiSidebarGroupLabel>
			)}
			{item.items && (
				<UiSidebarGroupContent>
					<UiSidebarMenu>
						<AppSidebarRecursiveItem items={item.items} />
					</UiSidebarMenu>
				</UiSidebarGroupContent>
			)}
		</UiSidebarGroup>
	)
}
