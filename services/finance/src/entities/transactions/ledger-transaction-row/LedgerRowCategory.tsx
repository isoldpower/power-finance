import { cn, FinanceBadge } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowCategory: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"hidden w-[108px] md:block"
			)}
			{...props}
		>
			<FinanceBadge tone="neutral" appearance="outline" size="sm">
				{children}
			</FinanceBadge>
		</div>
	);
}

LedgerRowCategory.displayName = 'LedgerRowCategory';

export { LedgerRowCategory };
