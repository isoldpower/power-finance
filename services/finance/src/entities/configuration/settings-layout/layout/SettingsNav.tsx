import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface SettingsNavProps {
	children: ReactNode;
}

const SettingsNav: FC<SettingsNavProps> = ({ children }) => (
	<nav
		className={cn(
			"flex gap-1 overflow-x-auto border-b border-border pb-2",
			"md:w-[200px] md:flex-none md:flex-col md:overflow-visible md:border-b-0 md:pb-0"
		)}
	>
		{children}
	</nav>
);

SettingsNav.displayName = 'SettingsNav';

export { SettingsNav };
export type { SettingsNavProps };
