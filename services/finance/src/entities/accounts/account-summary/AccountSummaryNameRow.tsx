import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountSummaryNameRow: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"mb-0.5 flex items-center gap-2.5"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountSummaryNameRow.displayName = 'AccountSummaryNameRow';

export { AccountSummaryNameRow };
