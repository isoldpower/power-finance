import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AccountSummaryHeroRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AccountSummaryHeroRow: FC<AccountSummaryHeroRowProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative flex flex-wrap items-start gap-x-3.5 gap-y-3 sm:flex-nowrap"
		)}
		{...props}
	>
		{children}
	</div>
);

AccountSummaryHeroRow.displayName = 'AccountSummaryHeroRow';

export { AccountSummaryHeroRow };
export type { AccountSummaryHeroRowProps };
