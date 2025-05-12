import { LogoComponent, SidebarHeader, useSidebar } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";

const AppSidebarHeader: FC<ComponentProps<typeof SidebarHeader>> = ({
	...props
}) => {
	const { open } = useSidebar();

	return (
		<SidebarHeader className="border-b border-b-sidebar-accent mb-4 p-4 h-[54px]" {...props}>
			<div className='flex justify-between items-center'>
				<LogoComponent withText={open} />
			</div>
		</SidebarHeader>
	)
}

AppSidebarHeader.displayName = 'AppSidebarHeader';

export { AppSidebarHeader };
export default AppSidebarHeader;
