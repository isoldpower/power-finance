import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AccountSummaryHeroProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AccountSummaryHero: FC<AccountSummaryHeroProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"relative overflow-hidden border-b border-border px-6 py-5"
		)}
		{...props}
	>
		{children}
	</div>
);

AccountSummaryHero.displayName = 'AccountSummaryHero';

export { AccountSummaryHero };
export type { AccountSummaryHeroProps };
