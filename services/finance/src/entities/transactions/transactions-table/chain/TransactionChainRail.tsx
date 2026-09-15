import { cn } from "@internal/ui-library";

import type { FC } from "react";
import type { ChainPosition } from "../../data-view";


interface TransactionChainRailProps {
	position: ChainPosition;
}

const TransactionChainRail: FC<TransactionChainRailProps> = ({ position }) => {
	if (position === 'single') return null;

	return (
		<>
			<span
				aria-hidden
				className={cn(
					"pointer-events-none absolute left-0 w-[3px] bg-primary",
					position === 'start' && "bottom-0 top-1/2",
					position === 'middle' && "inset-y-0",
					position === 'end' && "bottom-1/2 top-0"
				)}
			/>
			<span
				aria-hidden
				className={cn(
					"pointer-events-none absolute left-[-2px] top-1/2 size-[7px]",
					"-translate-y-1/2 rounded-full border-2 border-card bg-primary"
				)}
			/>
		</>
	);
};

TransactionChainRail.displayName = 'TransactionChainRail';

export { TransactionChainRail };
export type { TransactionChainRailProps };
