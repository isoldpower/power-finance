import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface LedgerLineRailProps {
	last?: boolean;
}

const LedgerLineRail: FC<LedgerLineRailProps> = ({ last = false }) => (
	<div aria-hidden className="relative w-[34px] flex-none">
		<span
			className={cn(
				"absolute left-[15px] top-0 w-0.5 bg-border-strong",
				last ? "h-[26px]" : "bottom-0"
			)}
		/>
		<span className="absolute left-[15px] top-[26px] h-0.5 w-[13px] bg-border-strong" />
	</div>
);

LedgerLineRail.displayName = 'LedgerLineRail';

export { LedgerLineRail };
export type { LedgerLineRailProps };
