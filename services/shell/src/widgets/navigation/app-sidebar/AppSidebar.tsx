import type { FC, ReactNode } from "react";
import { UiSeparator, UiSidebar, UiSidebarContent, UiSidebarFooter, UiSidebarRail } from "@internal/ui-library";

import { SIDEBAR_SECTIONS } from "../config.ts";
import { AppSidebarHeader } from "../sidebar-header/AppSidebarHeader.tsx";
import { SidebarNavSection } from "../sidebar-section/SidebarNavSection.tsx";


interface AppSidebarProps {
	children: ReactNode;
}

const AppSidebar: FC<AppSidebarProps> = ({ children }) => (
	<UiSidebar collapsible="icon">
		<AppSidebarHeader />
		<UiSidebarContent>
			{SIDEBAR_SECTIONS.map((section) => (
				<SidebarNavSection key={section.title} section={section} />
			))}
		</UiSidebarContent>
		<UiSidebarFooter>
			<UiSeparator />
			{children}
		</UiSidebarFooter>
		<UiSidebarRail />
	</UiSidebar>
);

AppSidebar.displayName = 'AppSidebar';

export { AppSidebar };
export type { AppSidebarProps };
