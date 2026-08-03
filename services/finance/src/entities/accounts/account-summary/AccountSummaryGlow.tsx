import { cn } from "@internal/ui-library";

import type { FC } from "react";


const AccountSummaryGlow: FC = () => {
	return (
		<div
			className={cn(
				"pointer-events-none absolute -right-10 -top-[60px] size-[200px] rounded-full",
				"bg-[radial-gradient(circle,var(--glow),transparent_68%)]",
			)}
		/>
	);
}

AccountSummaryGlow.displayName = 'AccountSummaryGlow';

export { AccountSummaryGlow };
