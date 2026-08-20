import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AccountSummaryHeroRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AccountSummaryHeroRow: FC<AccountSummaryHeroRowProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative flex items-start gap-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AccountSummaryHeroRow.displayName = 'AccountSummaryHeroRow';

export { AccountSummaryHeroRow };
export type { AccountSummaryHeroRowProps };
