import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountSummaryName: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"font-display text-[19px] font-semibold tracking-[-0.01em]"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

AccountSummaryName.displayName = 'AccountSummaryName';

export { AccountSummaryName };
