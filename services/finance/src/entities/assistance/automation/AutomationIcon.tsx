import type { FC } from "react";

interface AutomationIconProps {
	icon: string;
}

const AutomationIcon: FC<AutomationIconProps> = ({ icon }) => (
	<div className="flex size-[34px] flex-none items-center justify-center rounded-[9px] border border-border bg-secondary text-[15px]">{icon}</div>
);

AutomationIcon.displayName = 'AutomationIcon';

export { AutomationIcon };
export type { AutomationIconProps };
