import { cn } from "@internal/ui-library";

import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC } from "react";


interface NetWorthDeltaBadgeProps extends Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
	netDiffSign: '+' | '-';
}

const NetWorthDeltaBadge: FC<NetWorthDeltaBadgeProps> = ({ 
	children,
	netDiffSign,
	...props
}) => (
	<Text
		size="13"
		weight="semibold"
		className={cn(
			"mb-1.5 rounded-[var(--radius)] px-2 py-0.5",
			netDiffSign === '+'
				? "bg-pos-soft text-pos"
				: "bg-[var(--neg-soft)] text-neg"
		)}
		{...props}
	>
		{children}
	</Text>
);

export { NetWorthDeltaBadge };