import type { FC, PropsWithChildren } from "react";


type SettingsSectionRowInfoProps = PropsWithChildren;

const SettingsSectionRowInfo: FC<SettingsSectionRowInfoProps> = ({ children }) => (
	<div className="min-w-0">
		{children}
	</div>
);

SettingsSectionRowInfo.displayName = 'SettingsSectionRowInfo';

export { SettingsSectionRowInfo };
export type { SettingsSectionRowInfoProps };
