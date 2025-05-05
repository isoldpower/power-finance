import { LogoComponent, SidebarHeader, useSidebar } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";

const AppSidebarHeader: FC<ComponentProps<typeof SidebarHeader>> = ({
	...props
}) => {
	const { open } = useSidebar();

	return (
		<SidebarHeader className="drop-shadow shadow-sm mb-4 p-4" {...props}>
			<div className='flex justify-between items-center'>
				<LogoComponent withText={open} />
			</div>
		</SidebarHeader>
	)
}

AppSidebarHeader.displayName = 'AppSidebarHeader';

export { AppSidebarHeader };
export default AppSidebarHeader;
