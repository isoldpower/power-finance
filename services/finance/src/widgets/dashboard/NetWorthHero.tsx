import type { FC } from "react";
import { useMemo } from "react";
import { FinanceCard, cn } from "@internal/ui-library";

import { useInsights, buildSparkline, useSparklineHover } from "@feature/summary";
import { useConvertMoney } from "@feature/fx";
import { relativeAgo } from "@shared/utils";
import { HeroSkeleton, NetWorthHeadline, SparklineSvg, SparklineTooltip } from "@entity/summary";

import { NET_WORTH_RANGE_LABELS as RANGE_LABELS } from "./config.ts";

interface NetWorthHeroProps {
	range?: string;
	className?: string;
}

const NetWorthHero: FC<NetWorthHeroProps> = ({ range = '1M', className }) => {
	const { netWorth, isPending, isError } = useInsights({ metrics: ['net_worth'], range });
	const { convert } = useConvertMoney();

	return (
		<FinanceCard className={cn("relative overflow-hidden px-6 py-[22px]", className)}>
			<div className="relative">
				<div className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Total net worth
				</div>
				{isPending ? (
					<HeroSkeleton />
				) : isError || !netWorth ? (
					<div className="mt-3 text-[13px] text-text-3">Couldn’t load net worth.</div>
				) : (
					<HeroContent netWorth={netWorth} convert={convert} comparisonLabel={RANGE_LABELS[range] ?? 'vs last period'} />
				)}
			</div>
		</FinanceCard>
	);
};

interface HeroContentProps {
	netWorth: NonNullable<ReturnType<typeof useInsights>['netWorth']>;
	convert: ReturnType<typeof useConvertMoney>['convert'];
	comparisonLabel: string;
}

const HeroContent: FC<HeroContentProps> = ({ netWorth, convert, comparisonLabel }) => {
	const { value, change } = netWorth;
	const isUp = change.direction === 'up';
	const deltaAmount = (value.amount * change.pct) / 100;
	const converted = convert(value);
	const deltaConverted = convert({ amount: Math.abs(deltaAmount), currency: value.currency });

	return (
		<>
			<NetWorthHeadline
				amount={converted.amount}
				currency={converted.currency}
				pct={change.pct}
				isUp={isUp}
				deltaFormatted={deltaConverted.formatted}
				comparisonLabel={comparisonLabel}
			/>
			<NetWorthChart netWorth={netWorth} convert={convert} />
		</>
	);
};

interface NetWorthChartProps {
	netWorth: HeroContentProps['netWorth'];
	convert: HeroContentProps['convert'];
}

const NetWorthChart: FC<NetWorthChartProps> = ({ netWorth, convert }) => {
	const { value, series } = netWorth;
	const spark = useMemo(() => buildSparkline(series), [series]);
	const { ref, hover, tip, active, onMove, onLeave } = useSparklineHover(spark.points);

	const currentValue = series.length > 0 ? series[series.length - 1].v : value.amount;
	const diff = active ? active.value - currentValue : 0;
	const isNow = active ? (hover === spark.points.length - 1 || Math.abs(diff) < 0.5) : false;
	const diffPositive = diff >= 0;

	return (
		<div
			ref={ref}
			className="relative mt-3.5 h-[92px] cursor-crosshair"
			onMouseMove={onMove}
			onMouseLeave={onLeave}
		>
			<SparklineSvg stroke={spark.stroke} fill={spark.fill} lastY={spark.lastY} active={active} />
			{active && tip ? (
				<SparklineTooltip
					x={tip.x}
					y={tip.y}
					onLeft={tip.onLeft}
					valueFormatted={convert({ amount: active.value, currency: value.currency }).formatted}
					isNow={isNow}
					diffPositive={diffPositive}
					diffFormatted={convert({ amount: Math.abs(diff), currency: value.currency }).formatted}
					ago={relativeAgo(active.date)}
				/>
			) : null}
		</div>
	);
};

NetWorthHero.displayName = 'NetWorthHero';

export { NetWorthHero };
