import { ChartLegend, MUTED_INK, OUTFLOW_COLOR } from "@shared/charts";

import type { FC } from "react";


const PaceLegend: FC = () => (
	<ChartLegend label="Spending pace legend">
		<ChartLegend.Item color={OUTFLOW_COLOR} label="This period" />
		<ChartLegend.Item color={MUTED_INK} label="Previous period" />
	</ChartLegend>
);

PaceLegend.displayName = 'PaceLegend';

export { PaceLegend };
