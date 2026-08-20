import { createPortal } from "react-dom";
import { cn } from "@internal/ui-library";

import type { FC } from "react";
import { DisplayText, Text } from "@shared/pure-components/typography";


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
			"finance-theme pointer-events-none fixed z-[60] -translate-y-1/2 whitespace-nowrap",
			"rounded-[9px] bg-[var(--text)] px-[11px] py-[7px] shadow-[var(--shadow-lg)]",
			onLeft ? "-translate-x-[calc(100%+12px)]" : "translate-x-3"
		)}
		style={{ left: `${x.toFixed(1)}px`, top: `${y.toFixed(1)}px` }}
	>
		<DisplayText
			size="14"
			leading="1.1"
			className="text-[var(--surface)]"
			style={{ fontVariantNumeric: 'normal' }}
		>
			{valueFormatted}
		</DisplayText>
		<Text as="div" size="11" className="mt-[3px] flex items-center gap-[5px]">
			{isNow ? (
				<Text weight="semibold" tone="subtle">Current balance</Text>
			) : (
				<Text weight="semibold" tone={diffPositive ? "positive" : "negative"}>
					{diffPositive ? '+' : '−'}{diffFormatted} vs now
				</Text>
			)}
			<span className="text-[var(--surface)] opacity-55">· {ago}</span>
		</Text>
	</div>,
	document.body
);

NetWorthTooltip.displayName = 'NetWorthTooltip';

export { NetWorthTooltip };
export type { NetWorthTooltipProps };
