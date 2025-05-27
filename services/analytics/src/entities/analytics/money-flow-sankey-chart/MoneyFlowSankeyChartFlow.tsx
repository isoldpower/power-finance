import { LinkHorizontal } from "@visx/shape";
import type { Sankey, SankeyLink } from "@visx/sankey";
import type { ComponentProps, FC } from "react";

import type { MoneyFlowNode, MoneyFlowPiece } from "../model";


type SankeyChildren = ComponentProps<typeof Sankey<MoneyFlowNode, MoneyFlowPiece>>['children'];

interface MoneyFlowSankeyChartFlowProps {
	link: SankeyLink<MoneyFlowNode, MoneyFlowPiece>;
	color?: string;
	fill?: string;
	createPath: Parameters<NonNullable<SankeyChildren>>[0]['createPath'];
}

const MoneyFlowSankeyChartFlow: FC<MoneyFlowSankeyChartFlowProps> = ({
	link,
	color = 'var(--color-chart-2)',
	fill = 'transparent',
	createPath
}) => {
	return (
		<LinkHorizontal
			data={link}
			path={createPath}
			fill={fill}
			stroke={color}
			strokeWidth={link.width}
			strokeOpacity={0.4}
		/>
	);
};

MoneyFlowSankeyChartFlow.displayName = 'MoneyFlowSankeyChartFlow';

export { MoneyFlowSankeyChartFlow };
export type { MoneyFlowSankeyChartFlowProps };
