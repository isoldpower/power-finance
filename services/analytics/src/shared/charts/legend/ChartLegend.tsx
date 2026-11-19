import { ChartLegendItem } from "./parts/ChartLegendItem.tsx";

import type { FC, ReactNode } from "react";
import type { ChartLegendItemProps } from "./parts/ChartLegendItem.tsx";


interface ChartLegendProps {
	label: string;
	children: ReactNode;
}

type ChartLegendObject = FC<ChartLegendProps> & {
	Item: FC<ChartLegendItemProps>;
};

const ChartLegend: ChartLegendObject = ({ label, children }) => (
	<ul aria-label={label} className="flex flex-wrap items-center gap-x-1 gap-y-1">
		{children}
	</ul>
);

ChartLegend.Item = ChartLegendItem;
ChartLegend.displayName = 'ChartLegend';

export { ChartLegend };
export type { ChartLegendProps };
