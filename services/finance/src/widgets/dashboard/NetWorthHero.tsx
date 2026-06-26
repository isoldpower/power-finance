import type { FC } from "react";
import { FinanceCard, FinanceMoney, cn } from "@internal/ui-library";

import { useInsights } from "@feature/summary";
import { useConvertMoney } from "@feature/fx";
import type { SeriesPoint } from "@feature/summary";

const VIEW_W = 520;
const VIEW_H = 120;
const PAD = 8;

const buildSparkline = (series: SeriesPoint[]) => {
	if (series.length < 2) return { stroke: '', fill: '', lastY: VIEW_H / 2 };
	const values = series.map((point) => point.v);
	const min = Math.min(...values);
	const max = Math.max(...values);
	const span = max - min || 1;
	const points = values.map((value, index) => {
		const x = (index / (values.length - 1)) * VIEW_W;
		const y = VIEW_H - ((value - min) / span) * (VIEW_H - PAD * 2) - PAD;
		return [x, y] as const;
	});
	const stroke = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
	return {
		stroke,
		fill: `${stroke} L${VIEW_W.toString()} ${VIEW_H.toString()} L0 ${VIEW_H.toString()} Z`,
		lastY: points[points.length - 1][1],
	};
};

const RANGE_LABELS: Record<string, string> = {
	'1W': 'vs last week',
	'1M': 'vs last 30 days',
	'3M': 'vs last quarter',
	'1Y': 'vs last year',
};

interface NetWorthHeroProps {
	range?: string;
}

const NetWorthHero: FC<NetWorthHeroProps> = ({ range = '1M' }) => {
	const { netWorth, isPending, isError } = useInsights({ metrics: ['net_worth'], range });
	const { convert } = useConvertMoney();

	return (
		<FinanceCard className="relative overflow-hidden px-6 py-[22px]">
			<div className="pointer-events-none absolute -right-[50px] -top-[70px] size-[260px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)]" />
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
	const { value, change, series } = netWorth;
	const spark = buildSparkline(series);
	const isUp = change.direction === 'up';
	const deltaAmount = (value.amount * change.pct) / 100;
	const sign = isUp ? '+' : '−';
	const converted = convert(value);
	const deltaConverted = convert({ amount: Math.abs(deltaAmount), currency: value.currency });

	return (
		<>
			<div className="mt-2.5 flex items-end gap-3.5">
				<FinanceMoney size="display" className="leading-[0.95]" style={{ fontVariantNumeric: 'normal' }}>{converted.formatted}</FinanceMoney>
				<span className={cn("mb-1.5 rounded-[var(--radius)] px-2 py-0.5 text-[13px] font-bold", isUp ? "bg-pos-soft text-pos" : "bg-[var(--neg-soft)] text-neg")}>
					{sign}{Math.abs(change.pct)}%
				</span>
			</div>
			<div className="mt-2 text-[13px] text-text-2">
				{sign}{deltaConverted.formatted} <span className="text-text-3">{comparisonLabel}</span>
			</div>
			<div className="relative mt-3.5 h-[92px]">
				<svg viewBox={`0 0 ${VIEW_W.toString()} ${VIEW_H.toString()}`} preserveAspectRatio="none" className="block h-full w-full overflow-visible">
					<defs>
						<linearGradient id="netWorthSpark" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
					</defs>
					<path d={spark.fill} fill="url(#netWorthSpark)" />
					<path d={spark.stroke} fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
				</svg>
				{/* HTML dot stays a perfect circle — an SVG circle would distort under preserveAspectRatio="none". */}
				<span
					className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)]"
					style={{ left: '100%', top: `${((spark.lastY / VIEW_H) * 100).toFixed(2)}%` }}
				/>
			</div>
		</>
	);
};

const HeroSkeleton: FC = () => (
	<div>
		<div className="mt-2.5 h-[46px] w-56 animate-pulse rounded-[var(--radius-md)] bg-secondary" />
		<div className="mt-2 h-[18px] w-40 animate-pulse rounded bg-secondary" />
		<div className="mt-3.5 h-[92px]">
			<svg viewBox={`0 0 ${VIEW_W.toString()} ${VIEW_H.toString()}`} preserveAspectRatio="none" className="block h-full w-full">
				<line
					x1="0"
					y1={VIEW_H / 2}
					x2={VIEW_W}
					y2={VIEW_H / 2}
					stroke="var(--border-strong)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeDasharray="2 6"
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
		</div>
	</div>
);

NetWorthHero.displayName = 'NetWorthHero';

export { NetWorthHero };
