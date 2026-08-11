import { resolveAutomationIcon } from "./automation-icons.ts";

import type { FC } from "react";

interface AutomationIconProps {
	icon: string;
}

const AutomationIcon: FC<AutomationIconProps> = ({ icon }) => {
	const Icon = resolveAutomationIcon(icon);

	return (
		<div className="flex size-[34px] flex-none items-center justify-center rounded-[9px] border border-border bg-secondary text-text-2">
			<Icon size={16} />
		</div>
	);
};

AutomationIcon.displayName = 'AutomationIcon';

export { AutomationIcon };
export type { AutomationIconProps };
