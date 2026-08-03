import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountSummaryBalanceLabel: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountSummaryBalanceLabel.displayName = 'AccountSummaryBalanceLabel';

export { AccountSummaryBalanceLabel };
