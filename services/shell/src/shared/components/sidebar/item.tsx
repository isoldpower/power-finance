import {cloneElement, ComponentProps, FC, ReactElement} from "react";
import {SidebarMenuButton, SidebarMenuItem, useSidebar} from "@shared/components"
import {useLinkActive} from "@shared/lib";
import {Link} from "@tanstack/react-router";

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
						<div className="bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-foreground)] rounded p-[2px] h-6 w-6">
							{icon && cloneElement(icon, {
								...icon.props,
								height: '1.25rem',
								width: '1.25rem',
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
