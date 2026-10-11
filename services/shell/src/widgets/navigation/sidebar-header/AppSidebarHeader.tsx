import type { FC } from "react";
import { LogoComponent, UiSidebarHeader, useUiSidebar } from "@internal/ui-library";


const AppSidebarHeader: FC = () => {
	const { open } = useUiSidebar();

	return (
		<UiSidebarHeader className="border-b border-b-sidebar-accent mb-4 p-4 h-[54px]">
			<div className="flex justify-between items-center">
				<LogoComponent withText={open} />
			</div>
		</UiSidebarHeader>
	);
};

AppSidebarHeader.displayName = 'AppSidebarHeader';

export { AppSidebarHeader };
