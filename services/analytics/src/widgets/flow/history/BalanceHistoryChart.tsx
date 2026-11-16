import { useMemo } from "react";
import { FinanceButton } from "@internal/ui-library";
import { Caption } from "@internal/shared";
import { toBalanceHistoryView } from "@entity/flow";
import { ShowOnZoomed, TOTAL_LINE_KEY, useIndexZoom } from "@feature/flow";
import { ChartFrame, ChartLegend, TOTAL_INK, useSeriesVisibility } from "@shared/charts";
import { BalanceBrushStrip } from "./chart-partials/BalanceBrushStrip.tsx";
import { BalanceHistoryPlot } from "./chart-partials/BalanceHistoryPlot.tsx";
import { BRUSH_HEIGHT } from "./config.ts";

import type { FC } from "react";
import type { BalanceHistory } from "@entity/flow";


interface BalanceHistoryChartProps {
	history: BalanceHistory;
	currency: string;
	height?: number;
}

const BalanceHistoryChart: FC<BalanceHistoryChartProps> = ({ history, currency, height = 300 }) => {
	const view = useMemo(() => toBalanceHistoryView(history), [history]);
	const zoom = useIndexZoom(view.timestamps.length);
	const visibility = useSeriesVisibility();

	return (
		<div className="flex flex-col gap-3">
			<ChartFrame height={height} label="Wallet balances over time">
				{({ width }) => (
					<BalanceHistoryPlot
						view={view}
						domain={zoom.domain}
						width={width}
						height={height}
						currency={currency}
						showTotal={visibility.isVisible(TOTAL_LINE_KEY)}
						isVisible={visibility.isVisible}
					/>
				)}
			</ChartFrame>
			<ChartFrame height={BRUSH_HEIGHT} label="Zoom control">
				{({ width }) => (
					<BalanceBrushStrip
						key={zoom.resetCount}
						values={view.total}
						width={width}
						height={BRUSH_HEIGHT}
						onZoom={zoom.zoomTo}
						onClear={zoom.clear}
					/>
				)}
			</ChartFrame>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<ChartLegend label="Wallets">
					<ChartLegend.Item
						color={TOTAL_INK}
						label="All wallets"
						muted={!visibility.isVisible(TOTAL_LINE_KEY)}
						onToggle={() => { visibility.toggle(TOTAL_LINE_KEY); }}
					/>
					{view.wallets.map((series) => (
						<ChartLegend.Item
							key={series.key}
							color={series.wallet.color}
							label={series.wallet.name}
							muted={!visibility.isVisible(series.key)}
							onToggle={() => { visibility.toggle(series.key); }}
						/>
					))}
				</ChartLegend>
				<ShowOnZoomed
					zoomed={zoom.zoomed}
					fallback={(
						<Caption size="12">
							Drag across the strip to zoom
						</Caption>
					)}
				>
					<FinanceButton variant="ghost" size="sm" onClick={zoom.reset}>
						Reset zoom
					</FinanceButton>
				</ShowOnZoomed>
			</div>
		</div>
	);
};

BalanceHistoryChart.displayName = 'BalanceHistoryChart';

export { BalanceHistoryChart };
export type { BalanceHistoryChartProps };
