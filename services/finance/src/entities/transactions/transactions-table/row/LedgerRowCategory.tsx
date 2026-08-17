import { cn, FinanceBadge } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerRowCategoryProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const LedgerRowCategory: FC<LedgerRowCategoryProps> = ({
	children,
	...props
}) => (
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

LedgerRowCategory.displayName = 'LedgerRowCategory';

export { LedgerRowCategory };
export type { LedgerRowCategoryProps };
