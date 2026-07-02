import type { FC } from "react";
import { cn } from "@internal/ui-library";

interface AiBadgeProps {
	className?: string;
}

const AiBadge: FC<AiBadgeProps> = ({ className }) => (
	<span className={cn("rounded-[4px] bg-primary px-1.5 py-0.5 font-numeric text-[9px] font-semibold text-white", className)}>AI</span>
);

AiBadge.displayName = 'AiBadge';

export { AiBadge };
export type { AiBadgeProps };
