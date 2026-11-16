import { useMemo } from "react";
import { toCashFlowSeries } from "@entity/flow";
import { KpiGrid, KpiTile, SPARK_HEIGHT, SPARK_WIDTH } from "@entity/overview";
import { useKpiTiles } from "@feature/overview";
import { KPI_STAGGER_SECONDS } from "./config.ts";

import type { FC } from "react";
import type { CashFlow } from "@entity/flow";
import type { Overview } from "@entity/overview";


interface KpiStripProps {
	overview: Overview;
	cashFlow: CashFlow;
}

const KpiStrip: FC<KpiStripProps> = ({ overview, cashFlow }) => {
	const points = useMemo(() => toCashFlowSeries(cashFlow), [cashFlow]);
	const tiles = useKpiTiles(overview, points);

	return (
		<KpiGrid>
			{tiles.map((tile, index) => (
				<KpiTile key={tile.key} delay={index * KPI_STAGGER_SECONDS}>
					<KpiTile.Label>
						{tile.label}
					</KpiTile.Label>
					<KpiTile.Value>
						{tile.value}
					</KpiTile.Value>
					<KpiTile.Footnote>
						<KpiTile.Delta tone={tile.changeTone}>
							{tile.changeLabel}
						</KpiTile.Delta>
						{`vs ${tile.previousValue}`}
					</KpiTile.Footnote>
					<KpiTile.Sparkline
						id={`kpi-spark-${tile.key}`}
						line={tile.sparkline.line}
						area={tile.sparkline.area}
						color={tile.color}
						width={SPARK_WIDTH}
						height={SPARK_HEIGHT}
					/>
				</KpiTile>
			))}
		</KpiGrid>
	);
};

KpiStrip.displayName = 'KpiStrip';

export { KpiStrip };
export type { KpiStripProps };
