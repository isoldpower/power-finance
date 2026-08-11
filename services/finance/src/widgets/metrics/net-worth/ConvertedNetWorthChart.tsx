import { useMemo } from "react";
import {
	NetWorthActivePoint,
	NetWorthSparkline,
	NetWorthSparklineTip,
	NetWorthTooltip,
} from "@entity/metrics";
import {
	buildSparkline,
	useSparklineHover,
	useConvertedNetWorth,
	useFormattedChartData,
	useChartHoverData,
} from "@feature/metrics";
import { relativeAgo } from "@shared/formatting";

import type { FC } from "react";
import type { NetWorthInsight } from "@feature/metrics";


interface NetWorthChartProps {
	netWorth: NetWorthInsight
}

const ConvertedNetWorthChart: FC<NetWorthChartProps> = ({ netWorth }) => {
	const netWorthData = useConvertedNetWorth(netWorth);
	const sparklineData = useMemo(() => {
		return buildSparkline(netWorthData.netWorthSeries);
	}, [netWorthData.netWorthSeries]);
	const sparklineHover = useSparklineHover(sparklineData.points);
	
	const { formatValue, formatDiff } = useFormattedChartData(netWorthData.netWorthValue);
	const { currentDiff, isDiffPositive, isCurrentNow } = useChartHoverData(netWorthData, { 
		...sparklineHover,
		pointsCount: netWorthData.netWorthSeries.length,
	});

	return (
		<div
			ref={sparklineHover.ref}
			className="relative mt-3.5 h-[92px] cursor-crosshair"
			onMouseMove={sparklineHover.onMove}
			onMouseLeave={sparklineHover.onLeave}
		>
			<NetWorthSparkline stroke={sparklineData.stroke} fill={sparklineData.fill} />
			<NetWorthSparklineTip lastY={sparklineData.lastY} active={sparklineHover.active} />
			<NetWorthActivePoint active={sparklineHover.active} />
			{sparklineHover.active && sparklineHover.tip ? (
				<NetWorthTooltip
					{...sparklineHover.tip}
					onLeft={sparklineHover.tip.onLeft}
					valueFormatted={formatValue(sparklineHover.active)}
					isNow={isCurrentNow}
					diffPositive={isDiffPositive}
					diffFormatted={formatDiff(currentDiff)}
					ago={relativeAgo(sparklineHover.active.date)}
				/>
			) : null}
		</div>
	);
};

export { ConvertedNetWorthChart };