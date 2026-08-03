import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountSummaryHeroRow: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"relative flex items-start gap-3.5"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountSummaryHeroRow.displayName = 'AccountSummaryHeroRow';

export { AccountSummaryHeroRow };
