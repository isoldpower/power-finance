import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface NetWorthDeltaBadgeProps extends Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
	netDiffSign: '+' | '-';
}

const NetWorthDeltaBadge: FC<NetWorthDeltaBadgeProps> = ({ 
	children,
	netDiffSign,
	...props
}) => (
	<span
		className={cn(
			"mb-1.5 rounded-[var(--radius)] px-2 py-0.5 text-[13px] font-semibold",
			netDiffSign === '+'
				? "bg-pos-soft text-pos"
				: "bg-[var(--neg-soft)] text-neg"
		)}
		{...props}
	>
		{children}
	</span>
);

export { NetWorthDeltaBadge };