import { Sankey, sankeyJustify } from '@visx/sankey';
import { useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { useParentSize } from '@visx/responsive';
import type { FC } from 'react';
import type { SankeyLink, SankeyNode } from '@visx/sankey';

import { MoneyFlowSankeyChartNode, MoneyFlowSankeyChartShell, MoneyFlowSankeyChartFlow, SankeyChartNodeTooltip, SankeyChartFlowTooltip } from '@entity/analytics';
import { SankeyChartFlowInteractions, SankeyChartNodeInteractions } from '@feature/analytics';
import { data } from './dataMock';
import type { MoneyFlowNode, MoneyFlowPiece } from '@entity/analytics/model';


const NODE_PADDING = 10;
const NODE_WIDTH = 10;

interface MoneyFlowSankeyChartProps {
	height?: number;
	margin?: { top: number; bottom: number; left: number; right: number; };
}

const MoneyFlowSankeyChart: FC<MoneyFlowSankeyChartProps> = ({
	height: targetHeight = 400,
	margin: passedMargin
}) => {
	const { height, width, parentRef } = useParentSize();
	const linkTooltip = useTooltip<SankeyLink<MoneyFlowNode, MoneyFlowPiece>>();
	const nodeTooltip = useTooltip<SankeyNode<MoneyFlowNode, MoneyFlowPiece>>();

	const margin = useRef(passedMargin ?? { top: 20, left: 20, right: 20, bottom: 20 });
	const innerHeight = useMemo(() => height - margin.current.top - margin.current.bottom, [height]);
	const innerWidth = useMemo(() => width - margin.current.left - margin.current.right, [width]);

	return (
		<div className="relative" style={{ height: targetHeight }} ref={parentRef}>
			<MoneyFlowSankeyChartShell width={innerWidth} height={innerHeight}>
				<Sankey<MoneyFlowNode, MoneyFlowPiece>
					root={data}
					nodeWidth={NODE_WIDTH}
					size={[innerWidth, innerHeight]}
					nodePadding={NODE_PADDING}
					nodeAlign={sankeyJustify}
				>
					{({ graph, createPath }) => (
						<>
							<Group>
								{graph.links.map((link, i) => (
									<SankeyChartFlowInteractions 
										showTooltip={linkTooltip.showTooltip}
										hideTooltip={linkTooltip.hideTooltip}
										link={link}
										key={i}
									>
										<MoneyFlowSankeyChartFlow
											link={link}
											createPath={createPath} 
										/>
									</SankeyChartFlowInteractions>
								))}
							</Group>
							<Group>
								{graph.nodes.map((item, i) => (
									<SankeyChartNodeInteractions
										node={item}
										key={i}
										hideTooltip={nodeTooltip.hideTooltip}
										showTooltip={nodeTooltip.showTooltip}
									>
										<MoneyFlowSankeyChartNode node={item} />
									</SankeyChartNodeInteractions>
								))}
							</Group>
						</>
					)}
				</Sankey>
			</MoneyFlowSankeyChartShell>
			{linkTooltip.tooltipOpen && (
				<TooltipWithBounds key={Math.random()} top={linkTooltip.tooltipTop} left={linkTooltip.tooltipLeft}>
					<SankeyChartFlowTooltip tooltipData={linkTooltip.tooltipData} />
				</TooltipWithBounds>
			)}
			{nodeTooltip.tooltipOpen && (
				<TooltipWithBounds key={Math.random()} top={nodeTooltip.tooltipTop} left={nodeTooltip.tooltipLeft}>
					<SankeyChartNodeTooltip tooltipData={nodeTooltip.tooltipData} />
				</TooltipWithBounds>
			)}
		</div>
	);
}

MoneyFlowSankeyChart.displayName = 'MoneyFlowSankeyChart';

export { MoneyFlowSankeyChart };
export type { MoneyFlowSankeyChartProps };