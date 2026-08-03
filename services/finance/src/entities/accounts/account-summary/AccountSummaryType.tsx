import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountSummaryType: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"rounded-[4px] border border-border bg-secondary px-1.5 py-0.5 font-numeric text-[9.5px] font-semibold uppercase tracking-[0.04em] text-text-2"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

AccountSummaryType.displayName = 'AccountSummaryType';

export { AccountSummaryType };
