import type { FC } from "react";
import {
	UiSidebarGroup,
	UiSidebarGroupContent,
	UiSidebarGroupLabel,
	UiSidebarMenu,
	useUiSidebar,
} from "@internal/ui-library";

import { SidebarNavItem } from "../sidebar-item/SidebarNavItem.tsx";
import type { SidebarNavSection as SidebarNavSectionConfig } from "../types.ts";


interface SidebarNavSectionProps {
	section: SidebarNavSectionConfig;
}

const SidebarNavSection: FC<SidebarNavSectionProps> = ({ section }) => {
	const { open } = useUiSidebar();

	return (
		<UiSidebarGroup>
			{open && (
				<UiSidebarGroupLabel>
					{section.title}
				</UiSidebarGroupLabel>
			)}
			<UiSidebarGroupContent>
				<UiSidebarMenu>
					{section.links.map((link) => (
						<SidebarNavItem key={link.url} link={link} />
					))}
				</UiSidebarMenu>
			</UiSidebarGroupContent>
		</UiSidebarGroup>
	);
};

SidebarNavSection.displayName = 'SidebarNavSection';

export { SidebarNavSection };
export type { SidebarNavSectionProps };
