import type { ComponentProps, FC, ReactElement } from "react";

import { cloneElement} from "react";
import { useLinkActive } from "@shared/lib";
import { Link } from "@tanstack/react-router";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@internal/ui-library";

interface AppSidebarItemProps extends ComponentProps<typeof SidebarMenuItem> {
	title: string;
	to: string;
	icon?: ReactElement<{ height: string | number, width: string | number }, any>;
}

const AppSidebarItem: FC<AppSidebarItemProps> = ({
	to,
	title,
	children,
	icon,
	...props
}) => {
	const { open } = useSidebar();
	const active = useLinkActive(to, { deepLink: true });

	return (
		<SidebarMenuItem key={title} {...props}>
			<SidebarMenuButton asChild isActive={active}>
				{children ?? (
					<Link to={to} className={`flex gap-2 items-center text-sm${!open ? ' w-[3rem] justify-center' : ''}`}>
						<div className="flex items-center justify-center bg-sidebar-accent text-sidebar-foreground/60 rounded p-[2px] h-6 w-6">
							{icon && cloneElement(icon, {
								...icon.props,
								height: '1rem',
								width: '1rem',
							})}
						</div>
						{open && title}
					</Link>
				)}
			</SidebarMenuButton>
		</SidebarMenuItem>
	)
}

AppSidebarItem.displayName = 'AppSidebarItem';

export { AppSidebarItem };
export default AppSidebarItem;
