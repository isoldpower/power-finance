import { createPortal } from "react-dom";
import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface NetWorthTooltipProps {
	x: number;
	y: number;
	onLeft: boolean;
	valueFormatted: string;
	isNow: boolean;
	diffPositive: boolean;
	diffFormatted: string;
	ago: string;
}

const NetWorthTooltip: FC<NetWorthTooltipProps> = ({
	x,
	y,
	onLeft,
	valueFormatted,
	isNow,
	diffPositive,
	diffFormatted,
	ago
}) => createPortal(
	<div
		className={cn(
			"finance-theme pointer-events-none fixed z-[60] -translate-y-1/2 whitespace-nowrap rounded-[9px] bg-[var(--text)] px-[11px] py-[7px] shadow-[var(--shadow-lg)]",
			onLeft ? "-translate-x-[calc(100%+12px)]" : "translate-x-3"
		)}
		style={{ left: `${x.toFixed(1)}px`, top: `${y.toFixed(1)}px` }}
	>
		<div className="font-display text-[14px] font-semibold leading-[1.1] text-[var(--surface)]" style={{ fontVariantNumeric: 'normal' }}>
			{valueFormatted}
		</div>
		<div className="mt-[3px] flex items-center gap-[5px] text-[11px]">
			{isNow ? (
				<span className="font-semibold text-text-3">Current balance</span>
			) : (
				<span className={diffPositive ? "font-semibold text-pos" : "font-semibold text-neg"}>
					{diffPositive ? '+' : '−'}{diffFormatted} vs now
				</span>
			)}
			<span className="text-[var(--surface)] opacity-55">· {ago}</span>
		</div>
	</div>,
	document.body
);

NetWorthTooltip.displayName = 'NetWorthTooltip';

export { NetWorthTooltip };
export type { NetWorthTooltipProps };
