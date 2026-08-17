import { cn } from "@internal/ui-library";

import type { FC } from "react";
import type { LucideIcon } from "lucide-react";


interface AutomationIconProps {
	children: LucideIcon;
}

const AutomationIcon: FC<AutomationIconProps> = ({ 
	children: PassedLucideIcon
}) => (
	<div
		className={cn(
			"flex size-[34px] flex-none items-center justify-center rounded-[9px]",
			"border border-border bg-secondary text-text-2"
		)}
	>
		<PassedLucideIcon size={16} />
	</div>
);

AutomationIcon.displayName = 'AutomationIcon';

export { AutomationIcon };
export type { AutomationIconProps };
