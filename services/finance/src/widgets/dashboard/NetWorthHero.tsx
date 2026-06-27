import type { FC } from "react";
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FinanceCard, cn } from "@internal/ui-library";

import { AnimatedMoney } from "@shared/components";
import { useInsights } from "@feature/summary";
import { useConvertMoney } from "@feature/fx";
import type { SeriesPoint } from "@feature/summary";

const VIEW_W = 520;
const VIEW_H = 120;
const PAD = 8;

interface ChartPoint {
	xPct: number;
	yPct: number;
	value: number;
	date: string;
}

const buildSparkline = (series: SeriesPoint[]) => {
	if (series.length < 2) return { stroke: '', fill: '', lastY: VIEW_H / 2, points: [] as ChartPoint[] };
	const values = series.map((point) => point.v);
	const min = Math.min(...values);
	const max = Math.max(...values);
	const span = max - min || 1;
	const coords = values.map((value, index) => {
		const x = (index / (values.length - 1)) * VIEW_W;
		const y = VIEW_H - ((value - min) / span) * (VIEW_H - PAD * 2) - PAD;
		return [x, y] as const;
	});
	const stroke = coords.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
	const points = coords.map(([x, y], index) => ({
		xPct: (x / VIEW_W) * 100,
		yPct: (y / VIEW_H) * 100,
		value: series[index].v,
		date: series[index].t,
	}));
	return {
		stroke,
		fill: `${stroke} L${VIEW_W.toString()} ${VIEW_H.toString()} L0 ${VIEW_H.toString()} Z`,
		lastY: coords[coords.length - 1][1],
		points,
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
	const sign = isUp ? '+' : '−';
	const converted = convert(value);
	const deltaConverted = convert({ amount: Math.abs(deltaAmount), currency: value.currency });

	return (
		<>
			<div className="mt-2.5 flex items-end gap-3.5">
				<AnimatedMoney amount={converted.amount} currency={converted.currency} size="display" className="text-[42px] leading-[0.95]" style={{ fontVariantNumeric: 'normal' }} />
				<span className={cn("mb-1.5 rounded-[var(--radius)] px-2 py-0.5 text-[13px] font-semibold", isUp ? "bg-pos-soft text-pos" : "bg-[var(--neg-soft)] text-neg")}>
					{sign}{Math.abs(change.pct)}%
				</span>
			</div>
			<div className="mt-2 text-[13px] text-text-2">
				{sign}{deltaConverted.formatted} <span className="text-text-3">{comparisonLabel}</span>
			</div>
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
	const ref = useRef<HTMLDivElement>(null);
	const [hover, setHover] = useState<number | null>(null);
	const [tip, setTip] = useState<{ x: number; y: number; onLeft: boolean } | null>(null);

	const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect || spark.points.length === 0) return;
		const ratio = (event.clientX - rect.left) / rect.width;
		const index = Math.max(0, Math.min(spark.points.length - 1, Math.round(ratio * (spark.points.length - 1))));
		const point = spark.points[index];
		setHover(index);
		setTip({
			x: rect.left + (point.xPct / 100) * rect.width,
			y: rect.top + (point.yPct / 100) * rect.height,
			onLeft: point.xPct > 60,
		});
	};

	const onLeave = () => {
		setHover(null);
		setTip(null);
	};

	const currentValue = series.length > 0 ? series[series.length - 1].v : value.amount;
	const active = hover !== null ? spark.points[hover] : null;
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
			<svg viewBox={`0 0 ${VIEW_W.toString()} ${VIEW_H.toString()}`} preserveAspectRatio="none" className="block h-full w-full overflow-visible">
				<defs>
					<linearGradient id="netWorthSpark" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
						<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
					</linearGradient>
					<clipPath id="netWorthWipe">
						<rect x="0" y={-VIEW_H} width={VIEW_W} height={VIEW_H * 3} className="fx-wipe" />
					</clipPath>
				</defs>
				<path d={spark.fill} fill="url(#netWorthSpark)" className="fx-fade [animation-delay:0.7s]" />
				<path d={spark.stroke} clipPath="url(#netWorthWipe)" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
			</svg>

			{/* End dot — HTML element stays a perfect circle under preserveAspectRatio="none"; inset from the right edge so it sits inside the plot. */}
			{!active ? (
					<span
						className="fx-fade [animation-delay:1.5s] pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)]"
						style={{ left: 'calc(100% - 5px)', top: `${((spark.lastY / VIEW_H) * 100).toFixed(2)}%` }}
					/>
				) : null}

			{active ? (
				<>
					{/* Overshoots vertically — the card's overflow-hidden clips it to the full card height. */}
					<div className="pointer-events-none absolute -top-[300px] -bottom-[300px] border-l border-dashed border-border-strong" style={{ left: `${active.xPct.toFixed(2)}%` }} />
					<span
						className="pointer-events-none absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)] shadow-[0_0_0_1px_var(--primary)]"
						style={{ left: `${active.xPct.toFixed(2)}%`, top: `${active.yPct.toFixed(2)}%` }}
					/>
				</>
			) : null}

			{active && tip ? createPortal(
				<div
					className={cn(
						"finance-theme pointer-events-none fixed z-[60] -translate-y-1/2 whitespace-nowrap rounded-[9px] bg-[var(--text)] px-[11px] py-[7px] shadow-[var(--shadow-lg)]",
						tip.onLeft ? "-translate-x-[calc(100%+12px)]" : "translate-x-3"
					)}
					style={{ left: `${tip.x.toFixed(1)}px`, top: `${tip.y.toFixed(1)}px` }}
				>
					<div className="font-display text-[14px] font-semibold leading-[1.1] text-[var(--surface)]" style={{ fontVariantNumeric: 'normal' }}>
						{convert({ amount: active.value, currency: value.currency }).formatted}
					</div>
					<div className="mt-[3px] flex items-center gap-[5px] text-[11px]">
						{isNow ? (
							<span className="font-semibold text-text-3">Current balance</span>
						) : (
							<span className={diffPositive ? "font-semibold text-pos" : "font-semibold text-neg"}>
								{diffPositive ? '+' : '−'}{convert({ amount: Math.abs(diff), currency: value.currency }).formatted} vs now
							</span>
						)}
						<span className="text-[var(--surface)] opacity-55">· {relativeAgo(active.date)}</span>
					</div>
				</div>,
				document.body
			) : null}
		</div>
	);
};

const DAY_MS = 24 * 60 * 60 * 1000;

const relativeAgo = (iso: string): string => {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	const daysAgo = Math.round((Date.now() - date.getTime()) / DAY_MS);
	if (daysAgo <= 0) return 'now';
	if (daysAgo < 14) return `${daysAgo.toString()} day${daysAgo === 1 ? '' : 's'} ago`;
	if (daysAgo < 60) return `${Math.round(daysAgo / 7).toString()} weeks ago`;
	const months = Math.round(daysAgo / 30);
	return `${months.toString()} month${months === 1 ? '' : 's'} ago`;
};

const HeroSkeleton: FC = () => (
	<div>
		<div className="mt-2.5 h-[42px] w-56 animate-pulse rounded-[var(--radius-md)] bg-secondary" />
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
