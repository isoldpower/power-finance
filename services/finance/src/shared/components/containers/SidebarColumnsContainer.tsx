import { cn } from "@internal/ui-library";

import type { CSSProperties, FC, ReactNode } from "react";


interface SidebarColumnsContainerProps {
	children?: ReactNode;
	sidebar?: "start" | "end";
	sidebarWidth?: string;
	from?: "md" | "lg";
}

const SidebarColumnsContainer: FC<SidebarColumnsContainerProps> = ({
	children,
	sidebar = "end",
	sidebarWidth = "360px",
	from = "lg",
}) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 items-start gap-4",
				from === "md" && sidebar === "start" && "md:grid-cols-[var(--columns-sidebar-width)_1fr]",
				from === "md" && sidebar === "end" && "md:grid-cols-[1fr_var(--columns-sidebar-width)]",
				from === "lg" && sidebar === "start" && "lg:grid-cols-[var(--columns-sidebar-width)_1fr]",
				from === "lg" && sidebar === "end" && "lg:grid-cols-[1fr_var(--columns-sidebar-width)]",
			)}
			style={{ "--columns-sidebar-width": sidebarWidth } as CSSProperties}
		>
			{children}
		</div>
	);
}

SidebarColumnsContainer.displayName = 'SidebarColumnsContainer';

export { SidebarColumnsContainer };
export type { SidebarColumnsContainerProps };
