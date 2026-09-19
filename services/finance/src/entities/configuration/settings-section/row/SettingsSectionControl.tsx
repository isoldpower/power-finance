import type { FC, PropsWithChildren } from "react";


type SettingsSectionControlProps = PropsWithChildren;

const SettingsSectionControl: FC<SettingsSectionControlProps> = ({ children }) => (
	<div className="w-full flex-none sm:w-[260px]">
		{children}
	</div>
);

SettingsSectionControl.displayName = 'SettingsSectionControl';

export { SettingsSectionControl };
export type { SettingsSectionControlProps };
