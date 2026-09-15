import { cn, Icons } from "@internal/ui-library";

import type { FC } from "react";


interface TransactionChainBadgeProps {
	size: number | null;
	className?: string;
}

const TransactionChainBadge: FC<TransactionChainBadgeProps> = ({ size, className }) => (
	<span
		className={cn(
			"inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-1.5 py-0.5",
			"text-[10px] font-medium leading-none text-primary",
			className
		)}
	>
		<Icons.Link2 size={10} />
		{size === null ? 'Linked' : `Linked · ${String(size)}`}
	</span>
);

TransactionChainBadge.displayName = 'TransactionChainBadge';

export { TransactionChainBadge };
export type { TransactionChainBadgeProps };
