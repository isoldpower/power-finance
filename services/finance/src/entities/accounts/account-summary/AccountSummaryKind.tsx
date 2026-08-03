import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountSummaryKind: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"text-[12.5px] text-text-3"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountSummaryKind.displayName = 'AccountSummaryKind';

export { AccountSummaryKind };
