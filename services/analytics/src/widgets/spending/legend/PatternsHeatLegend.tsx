import { HEAT_SCALE, HeatLegend } from "@entity/spending";

import type { FC } from "react";


const PatternsHeatLegend: FC = () => <HeatLegend colors={HEAT_SCALE} lowLabel="Less" highLabel="More" />;

PatternsHeatLegend.displayName = 'PatternsHeatLegend';

export { PatternsHeatLegend };
