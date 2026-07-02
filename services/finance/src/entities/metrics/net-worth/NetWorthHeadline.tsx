import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { AnimatedMoney } from "@entity/localization";

interface NetWorthHeadlineProps {
	amount: number;
	currency: string;
	pct: number;
	isUp: boolean;
	deltaFormatted: string;
	comparisonLabel: string;
}

const NetWorthHeadline: FC<NetWorthHeadlineProps> = ({ amount, currency, pct, isUp, deltaFormatted, comparisonLabel }) => {
	const sign = isUp ? '+' : '−';

	return (
		<>
			<div className="mt-2.5 flex items-end gap-3.5">
				<AnimatedMoney amount={amount} currency={currency} size="display" className="text-[42px] leading-[0.95]" style={{ fontVariantNumeric: 'normal' }} />
				<span className={cn("mb-1.5 rounded-[var(--radius)] px-2 py-0.5 text-[13px] font-semibold", isUp ? "bg-pos-soft text-pos" : "bg-[var(--neg-soft)] text-neg")}>
					{sign}{Math.abs(pct)}%
				</span>
			</div>
			<div className="mt-2 text-[13px] text-text-2">
				{sign}{deltaFormatted} <span className="text-text-3">{comparisonLabel}</span>
			</div>
		</>
	);
};

NetWorthHeadline.displayName = 'NetWorthHeadline';

export { NetWorthHeadline };
export type { NetWorthHeadlineProps };
