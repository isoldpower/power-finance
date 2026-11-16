import { useMemo } from "react";
import { deltaTone } from "@entity/overview";
import { formatChangePercent } from "@shared/formatting";
import { formatChangePoints } from "./kpi-partials/format-change-points.ts";
import { KPI_DEFINITIONS } from "./config.ts";
import { sparklineGeometry } from "./kpi-partials/sparkline-geometry.ts";
import { useKpiValueFormat } from "./kpi-partials/use-kpi-value-format.ts";

import type { CashFlowPoint } from "@entity/flow";
import type { KpiDeltaTone, KpiKey, Overview } from "@entity/overview";
import type { SparklineGeometry } from "./kpi-partials/sparkline-geometry.ts";


interface KpiTileView {
	key: KpiKey;
	label: string;
	color: string;
	value: string;
	previousValue: string;
	changeLabel: string;
	changeTone: KpiDeltaTone;
	sparkline: SparklineGeometry;
}

const useKpiTiles = (overview: Overview, points: CashFlowPoint[]): KpiTileView[] => {
	const formatKpi = useKpiValueFormat();

	return useMemo(() => {
		return KPI_DEFINITIONS.map((definition) => {
			const change = definition.change(overview);
			const formatChange = definition.changeUnit === 'points' ? formatChangePoints : formatChangePercent;

			return {
				key: definition.key,
				label: definition.label,
				color: definition.color,
				value: formatKpi(definition.key, overview.current),
				previousValue: formatKpi(definition.key, overview.previous),
				changeLabel: formatChange(change),
				changeTone: deltaTone(change, definition.preference),
				sparkline: sparklineGeometry(points.map(definition.spark)),
			};
		});
	}, [overview, points, formatKpi]);
};

export { useKpiTiles };
export type { KpiTileView };
