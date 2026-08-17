import { useMemo } from "react";
import { NetWorthGraph } from "@entity/metrics";
import {
	buildSparkline,
	useSparklineHover,
	useConvertedNetWorth,
	useFormattedChartData,
	useChartHoverData,
} from "@feature/metrics";
import { relativeAgo } from "@shared/formatting";

import type { FC } from "react";
import type { NetWorth } from "@entity/metrics";


interface NetWorthChartProps {
	netWorth: NetWorth
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
		<NetWorthGraph
			ref={sparklineHover.ref}
			onMouseMove={sparklineHover.onMove}
			onMouseLeave={sparklineHover.onLeave}
		>
			<NetWorthGraph.Sparkline stroke={sparklineData.stroke} fill={sparklineData.fill} />
			<NetWorthGraph.Tip lastY={sparklineData.lastY} active={sparklineHover.active} />
			<NetWorthGraph.ActivePoint active={sparklineHover.active} />
			{sparklineHover.active && sparklineHover.tip ? (
				<NetWorthGraph.Tooltip
					{...sparklineHover.tip}
					onLeft={sparklineHover.tip.onLeft}
					valueFormatted={formatValue(sparklineHover.active)}
					isNow={isCurrentNow}
					diffPositive={isDiffPositive}
					diffFormatted={formatDiff(currentDiff)}
					ago={relativeAgo(sparklineHover.active.date)}
				/>
			) : null}
		</NetWorthGraph>
	);
};

export { ConvertedNetWorthChart };