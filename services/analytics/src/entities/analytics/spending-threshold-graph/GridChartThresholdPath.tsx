import { curveBasis } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { AccessorForArrayItem } from "@visx/shape/lib/types";
import type { FC } from "react";

import { SpendingDataFlat } from "../model";


interface GridChartThresholdPathProps {
    data: SpendingDataFlat[];
    xAccessor: AccessorForArrayItem<SpendingDataFlat, number>;
    yAccessor: AccessorForArrayItem<SpendingDataFlat, number>;
}

const GridChartThresholdPath: FC<GridChartThresholdPathProps> = ({
    data,
    xAccessor,
    yAccessor,
}) => {
    return (
		<LinePath
			data={data}
			curve={curveBasis}
			x={xAccessor}
			y={yAccessor}
			stroke="var(--card-foreground)"
			strokeWidth={1.5}
			strokeOpacity={0.8}
		/>
    )    
};

GridChartThresholdPath.displayName = "GridChartThresholdPath";

export { GridChartThresholdPath };
export type { GridChartThresholdPathProps };