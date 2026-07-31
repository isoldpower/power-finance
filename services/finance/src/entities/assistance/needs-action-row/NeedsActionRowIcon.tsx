import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";
import type { ActionType } from "../types.ts";


interface NeedsActionRowIconProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	iconType?: ActionType;
}

const NeedsActionRowIcon: FC<NeedsActionRowIconProps> = ({ 
	children,
	iconType = 'uncategorized',
	...props
}) => (
	<div 
		className={cn(
			"flex size-[34px] flex-none items-center justify-center",
			"rounded-[9px] text-[15px] font-semibold",
			iconType === "recurring" && "bg-[var(--accent-soft)] text-primary",
			iconType === "duplicate" && "bg-[var(--warn-soft)] text-warn",
			iconType === "uncategorized" && "bg-[var(--viol-soft)] text-viol"
		)}
		{...props}
	>
		{children}
	</div>
);

NeedsActionRowIcon.displayName = 'NeedsActionRowIcon';

export { NeedsActionRowIcon };