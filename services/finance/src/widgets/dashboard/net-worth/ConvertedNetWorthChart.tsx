import { FC, useCallback, useMemo } from "react";
import { buildSparkline, ChartPoint, NetWorthInsight, useSparklineHover } from "@feature/summary";
import { SparklineSvg, SparklineTooltip } from "@entity/summary";
import { relativeAgo } from "@shared/utils";
import { useConvertMoney } from "@feature/fx";
import { useConvertedNetWorth } from "@feature/metrics/convert-currency/use-converted-net-worth.ts";


interface NetWorthChartProps {
	netWorth: NetWorthInsight
}

const ConvertedNetWorthChart: FC<NetWorthChartProps> = ({ netWorth }) => {
	const { convert } = useConvertMoney();
	const { netWorthSeries, netWorthValue } = useConvertedNetWorth(netWorth);
	const sparklineData = useMemo(() => {
		return buildSparkline(netWorthSeries);
	}, [netWorthSeries]);
	const { ref, hover, tip, active, onMove, onLeave } = useSparklineHover(sparklineData.points);

	const currentValue = useMemo(() => {
		return netWorthSeries.length > 0 
			? netWorthSeries[netWorthSeries.length - 1].v 
			: netWorthValue.amount;
	}, [netWorthSeries, netWorthValue]);
	const { currentDiff, isDiffPositive, isCurrentNow } = useMemo(() => ({
		currentDiff: active ? active.value - currentValue : 0,
		isDiffPositive: (active ? active.value - currentValue : 0) >= 0,
		isCurrentNow: active 
			? (hover === sparklineData.points.length - 1 || Math.abs(active.value - currentValue) < 0.5) 
			: false
	}), [active, currentValue, hover, sparklineData.points]);
	
	const formatValue = useCallback((active: ChartPoint) => {
		return convert({
			amount: active.value,
			currency: netWorthValue.currency
		}).formatted;
	}, [convert, netWorthValue.currency]);
	const formatDiff = useCallback((diff: number) => {
		return convert({
			amount: Math.abs(diff),
			currency: netWorthValue.currency,
		}).formatted;
	}, [convert, netWorthValue.currency]);

	return (
		<div
			ref={ref}
			className="relative mt-3.5 h-[92px] cursor-crosshair"
			onMouseMove={onMove}
			onMouseLeave={onLeave}
		>
			<SparklineSvg 
				stroke={sparklineData.stroke}
				fill={sparklineData.fill}
				lastY={sparklineData.lastY}
				active={active} />
			{active && tip ? (
				<SparklineTooltip {...tip}
					onLeft={tip.onLeft}
					valueFormatted={formatValue(active)}
					isNow={isCurrentNow}
					diffPositive={isDiffPositive}
					diffFormatted={formatDiff(currentDiff)}
					ago={relativeAgo(active.date)}
				/>
			) : null}
		</div>
	);
};

export { ConvertedNetWorthChart };