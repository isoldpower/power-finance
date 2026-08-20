import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


type AccountSummaryGlowProps = Omit<BaseHTMLAttributes<HTMLDivElement>, 'className' | 'children'>;

const AccountSummaryGlow: FC<AccountSummaryGlowProps> = ({ ...props }) => (
	<div
		className={cn(
			"pointer-events-none absolute -right-10 -top-[60px] size-[200px] rounded-full",
			"bg-[radial-gradient(circle,var(--glow),transparent_68%)]"
		)}
		{...props}
	/>
);

AccountSummaryGlow.displayName = 'AccountSummaryGlow';

export { AccountSummaryGlow };
export type { AccountSummaryGlowProps };
