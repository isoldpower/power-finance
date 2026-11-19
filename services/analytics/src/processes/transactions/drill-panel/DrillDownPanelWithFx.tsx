import { ShowOnDrillOpen } from "@feature/transactions";
import { DrillDownPanelContent } from "./panel-partials/DrillDownPanelContent.tsx";

import type { FC } from "react";


const DrillDownPanelWithFx: FC = () => (
	<ShowOnDrillOpen>
		{(drill) => (
			<DrillDownPanelContent drill={drill} />
		)}
	</ShowOnDrillOpen>
);

DrillDownPanelWithFx.displayName = 'DrillDownPanelWithFx';

export { DrillDownPanelWithFx };
