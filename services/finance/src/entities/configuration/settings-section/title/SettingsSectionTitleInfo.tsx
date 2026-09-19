import type { FC, PropsWithChildren } from "react";


type SettingsSectionTitleInfoProps = PropsWithChildren;

const SettingsSectionTitleInfo: FC<SettingsSectionTitleInfoProps> = ({ children }) => (
	<div className="flex min-w-0 flex-col gap-1">
		{children}
	</div>
);

SettingsSectionTitleInfo.displayName = 'SettingsSectionTitleInfo';

export { SettingsSectionTitleInfo };
export type { SettingsSectionTitleInfoProps };
