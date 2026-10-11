import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";


interface SidebarIconTileProps {
	children: ReactNode;
}

const SidebarIconTile: FC<SidebarIconTileProps> = ({ children }) => (
	<div className={cn(
		"flex items-center justify-center h-6 w-6 p-[2px] rounded",
		"bg-sidebar-accent text-sidebar-foreground/60",
	)}>
		{children}
	</div>
);

SidebarIconTile.displayName = 'SidebarIconTile';

export { SidebarIconTile };
export type { SidebarIconTileProps };
