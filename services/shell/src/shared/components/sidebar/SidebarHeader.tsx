import { LogoComponent, UiSidebarHeader, useUiSidebar } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";

const AppSidebarHeader: FC<ComponentProps<typeof UiSidebarHeader>> = ({
	...props
}) => {
	const { open } = useUiSidebar();

	return (
		<UiSidebarHeader className="border-b border-b-sidebar-accent mb-4 p-4 h-[54px]" {...props}>
			<div className='flex justify-between items-center'>
				<LogoComponent withText={open} />
			</div>
		</UiSidebarHeader>
	)
}

AppSidebarHeader.displayName = 'AppSidebarHeader';

export { AppSidebarHeader };
export default AppSidebarHeader;
