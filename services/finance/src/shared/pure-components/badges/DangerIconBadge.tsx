import { cn, Icons } from "@internal/ui-library";

import type { FC } from "react";


interface DangerIconBadgeProps {
	className?: string;
	iconSize?: number;
}

const DangerIconBadge: FC<DangerIconBadgeProps> = ({ className, iconSize = 20 }) => (
	<div 
		className={cn(
			"flex items-center justify-center rounded-full bg-[var(--neg-soft)] text-neg",
			className,
		)}
	>
		<Icons.Trash2 size={iconSize} />
	</div>
);

DangerIconBadge.displayName = 'DangerIconBadge';

export { DangerIconBadge };
export type { DangerIconBadgeProps };
