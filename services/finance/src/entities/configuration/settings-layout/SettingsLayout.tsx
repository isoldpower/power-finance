import { SettingsNav } from "./layout/SettingsNav.tsx";
import { SettingsNavItem } from "./layout/SettingsNavItem.tsx";
import { SettingsPageHeader } from "./layout/SettingsPageHeader.tsx";
import { SettingsSection } from "./layout/SettingsSection.tsx";

import type { FC, PropsWithChildren } from "react";
import type { SettingsNavProps } from "./layout/SettingsNav.tsx";
import type { SettingsNavItemProps } from "./layout/SettingsNavItem.tsx";
import type { SettingsPageHeaderProps } from "./layout/SettingsPageHeader.tsx";
import type { SettingsSectionProps } from "./layout/SettingsSection.tsx";


type SettingsLayoutProps = PropsWithChildren;
type SettingsLayoutObject = FC<SettingsLayoutProps> & {
	Header: FC<SettingsPageHeaderProps>;
	Nav: FC<SettingsNavProps>;
	NavItem: FC<SettingsNavItemProps>;
	Content: FC<PropsWithChildren>;
	Section: FC<SettingsSectionProps>;
};

const SettingsContent: FC<PropsWithChildren> = ({ children }) => (
	<div className="flex min-w-0 flex-1 flex-col gap-6">
		{children}
	</div>
);


const SettingsLayout: SettingsLayoutObject = ({ children }) => (
	<div className="mx-auto flex w-full max-w-[1040px] flex-col px-4 py-6 md:px-6">
		{children}
	</div>
);

SettingsLayout.Header = SettingsPageHeader;
SettingsLayout.Nav = SettingsNav;
SettingsLayout.NavItem = SettingsNavItem;
SettingsLayout.Content = SettingsContent;
SettingsLayout.Section = SettingsSection;
SettingsLayout.displayName = 'SettingsLayout';

SettingsContent.displayName = 'SettingsContent';

export { SettingsLayout };
export type { SettingsLayoutProps };
