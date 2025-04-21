import {FC, ReactNode} from "react";

const SidebarBox: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="flex items-center px-2 border rounded justify-stretch focus-within:border-sidebar-accent-foreground">
			{children}
		</div>
	)
}

SidebarBox.displayName = 'SidebarBox';

export { SidebarBox };
