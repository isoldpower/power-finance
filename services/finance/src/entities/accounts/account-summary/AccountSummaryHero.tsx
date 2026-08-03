import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountSummaryHero: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"relative overflow-hidden border-b border-border px-6 py-5"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountSummaryHero.displayName = 'AccountSummaryHero';

export { AccountSummaryHero };
