import type { ComponentProps, FC } from "react";
import { UiSeparator, UiSidebarFooter, useUiSidebar } from "@internal/ui-library"
import { LabeledThemeSwitch } from "@widget/settings";
import { SidebarAuthentication } from "@widget/auth";

const AppSidebarFooter: FC<ComponentProps<typeof UiSidebarFooter>> = ({
	...props
}) => {
	const {open} = useUiSidebar();

	return (
		<UiSidebarFooter {...props}>
			<UiSeparator />
			<LabeledThemeSwitch className={!open ? "flex-col gap-2" : ""}>
				<span className="text-xs text-muted-foreground">
					{open ? 'Dark Mode' : 'Dark'}
				</span>
			</LabeledThemeSwitch>
			<SidebarAuthentication/>
		</UiSidebarFooter>
	)
}

AppSidebarFooter.displayName = 'AppSidebarFooter';

export { AppSidebarFooter };
export default AppSidebarFooter;
