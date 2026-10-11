import type { FC } from "react";
import { useUiSidebar } from "@internal/ui-library";

import { LabeledThemeSwitch } from "../labeled-theme-switch/LabeledThemeSwitch.tsx";


const SidebarThemeSwitch: FC = () => {
	const { open } = useUiSidebar();

	return (
		<LabeledThemeSwitch className={open ? undefined : "flex-col gap-2"}>
			<span className="text-xs text-muted-foreground">
				{open ? 'Dark Mode' : 'Dark'}
			</span>
		</LabeledThemeSwitch>
	);
};

SidebarThemeSwitch.displayName = 'SidebarThemeSwitch';

export { SidebarThemeSwitch };
