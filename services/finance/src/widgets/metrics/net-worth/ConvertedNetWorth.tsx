import { cn } from "@internal/ui-library";
import { useMemo } from "react";
import { AnimatedMoney } from "@entity/localization";
import { NetWorthInsight } from "@feature/metrics";

import type { FC } from "react";
import type { Period } from "@entity/metrics";
import { useConvertedNetWorth } from "@feature/metrics/convert-currency/use-converted-net-worth.ts";
import { useConvertedNetDiff } from "@feature/metrics/convert-currency/use-converted-net-diff.ts";


interface ConvertedNetWorthProps {
	period: Period;
	netWorth: NetWorthInsight
}

const ConvertedNetWorth: FC<ConvertedNetWorthProps> = ({ netWorth, period }) => {
	const { netWorthDiff, convertedNetWorth } = useConvertedNetWorth(netWorth);
	const { netDiffConverted, netDiffSign } = useConvertedNetDiff(netWorth);
	
	// const netWorthLabel = useMemo(() => {
	// 	return NET_WORTH_RANGE_LABELS[period] ?? 'vs last period';
	// }, [period]);

	return (
		<>
			<div className="mt-2.5 flex items-end gap-3.5">
				<AnimatedMoney 
					amount={convertedNetWorth.amount}
					currency={convertedNetWorth.currency} 
					size="display" 
					className="text-[42px] leading-[0.95]" 
					style={{ fontVariantNumeric: 'normal' }} 
				/>
				<span className={cn(
					"mb-1.5 rounded-[var(--radius)] px-2 py-0.5 text-[13px] font-semibold", 
					netDiffSign === '+' 
						? "bg-pos-soft text-pos" 
						: "bg-[var(--neg-soft)] text-neg")}
				>
					{netDiffSign}{Math.abs(netWorthDiff.pct)}%
				</span>
			</div>
			<div className="mt-2 text-[13px] text-text-2">
				{netDiffSign}{netDiffConverted.formatted} 
				<span className="text-text-3">
					FIXME
					{/*{netWorthLabel}*/}
				</span>
			</div>
		</>
	);
};

export { ConvertedNetWorth };
