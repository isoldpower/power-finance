import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { cn, UiSidebarMenuButton, UiSidebarMenuItem, useUiSidebar } from "@internal/ui-library";
import { SidebarIconTile } from "@entity/navigation";
import { useLinkActive } from "@shared/lib";

import type { UseLinkActiveOptions } from "@shared/lib";

import type { SidebarNavLink } from "../types.ts";


const ACTIVE_MATCH_OPTIONS: UseLinkActiveOptions = { deepLink: true };

interface SidebarNavItemProps {
	link: SidebarNavLink;
}

const SidebarNavItem: FC<SidebarNavItemProps> = ({ link }) => {
	const { open } = useUiSidebar();
	const active = useLinkActive(link.url, ACTIVE_MATCH_OPTIONS);
	const { icon: Icon } = link;

	return (
		<UiSidebarMenuItem>
			<UiSidebarMenuButton asChild isActive={active}>
				<Link to={link.url} className={cn("flex gap-2 items-center text-sm", !open && "w-[3rem] justify-center")}>
					<SidebarIconTile>
						<Icon className="size-4" />
					</SidebarIconTile>
					{open && link.title}
				</Link>
			</UiSidebarMenuButton>
		</UiSidebarMenuItem>
	);
};

SidebarNavItem.displayName = 'SidebarNavItem';

export { SidebarNavItem };
export type { SidebarNavItemProps };
