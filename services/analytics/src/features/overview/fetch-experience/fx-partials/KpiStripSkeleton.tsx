import { KpiGrid, KpiTileSkeleton } from "@entity/overview";
import { KPI_DEFINITIONS } from "../../kpis";

import type { FC } from "react";


const KpiStripSkeleton: FC = () => (
	<KpiGrid>
		{KPI_DEFINITIONS.map((definition) => (
			<KpiTileSkeleton key={definition.key} />
		))}
	</KpiGrid>
);

KpiStripSkeleton.displayName = 'KpiStripSkeleton';

export { KpiStripSkeleton };
