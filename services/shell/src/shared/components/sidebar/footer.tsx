import type { ComponentProps, FC } from "react";
import {Separator, SidebarFooter, useSidebar} from "@shared/components"
import { LabeledThemeSwitch } from "@widget/core";

const AppSidebarFooter: FC<ComponentProps<typeof SidebarFooter>> = ({
	...props
}) => {
	const {open} = useSidebar();

	return (
		<SidebarFooter {...props}>
			<Separator />
			<LabeledThemeSwitch className={!open ? "flex-col gap-2" : ""}>
				<span className="text-xs text-muted-foreground">
					{open ? 'Dark Mode' : 'Dark'}
				</span>
			</LabeledThemeSwitch>
		</SidebarFooter>
	)
}

AppSidebarFooter.displayName = 'AppSidebarFooter';

export { AppSidebarFooter };
export default AppSidebarFooter;
