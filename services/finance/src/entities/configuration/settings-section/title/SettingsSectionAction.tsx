import type { FC, PropsWithChildren } from "react";


type SettingsSectionActionProps = PropsWithChildren;

const SettingsSectionAction: FC<SettingsSectionActionProps> = ({ children }) => (
	<div className="flex-none">
		{children}
	</div>
);

SettingsSectionAction.displayName = 'SettingsSectionAction';

export { SettingsSectionAction };
export type { SettingsSectionActionProps };
