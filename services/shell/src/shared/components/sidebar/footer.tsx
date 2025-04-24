import type { ComponentProps, FC } from "react";
import { Separator, SidebarFooter, useSidebar } from "@internal/ui-library"
import { LabeledThemeSwitch } from "@widget/settings";
import { SidebarAuthentication } from "@widget/auth";

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
			<SidebarAuthentication/>
		</SidebarFooter>
	)
}

AppSidebarFooter.displayName = 'AppSidebarFooter';

export { AppSidebarFooter };
export default AppSidebarFooter;
