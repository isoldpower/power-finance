import { SankeyLinkMark, SankeyNodeMark } from "@entity/flow";
import { ShowOnNodeLabelFits, ShowOnNodeValueFits, useMoneyFlowPlot } from "@feature/flow";
import { ShowOnHoverAt } from "@feature/interactions";
import { ChartTooltip } from "@shared/charts";
import { useAmountFormat } from "@shared/formatting";
import { LinkTooltipContent } from "./plot-partials/LinkTooltipContent.tsx";
import { NodeTooltipContent } from "./plot-partials/NodeTooltipContent.tsx";

import type { FC } from "react";
import type { FlowNode, MoneyFlow } from "@entity/flow";


interface MoneyFlowPlotProps {
	flow: MoneyFlow;
	width: number;
	height: number;
	currency: string;
	expenseColorOf: (key: string) => string;
	onSelectNode: (node: FlowNode) => void;
}

const MoneyFlowPlot: FC<MoneyFlowPlotProps> = ({ flow, width, height, currency, expenseColorOf, onSelectNode }) => {
	const formatAmount = useAmountFormat(currency);
	const {
		nodeMarks,
		linkMarks,
		totalInflow,
		colorOfNode,
		colorOfLink,
		hoveredNode,
		hoveredNodeAnchor,
		hoveredLink,
		hoveredLinkAnchor,
		hoverNode,
		hoverLink,
	} = useMoneyFlowPlot({ flow, width, height, expenseColorOf });

	return (
		<>
			<svg width={width} height={height}>
				<g>
					{linkMarks.map(({ link, path, color, emphasis, categoryEnd }) => (
						<SankeyLinkMark
							key={link.key}
							path={path}
							width={link.width}
							presence={link.presence}
							color={color}
							emphasis={emphasis}
							onHover={(hovered) => { hoverLink(link.key, hovered); }}
							onSelect={() => { onSelectNode(categoryEnd); }}
						/>
					))}
				</g>
				<g>
					{nodeMarks.map(({ node, color, labels, dimmed }) => (
						<SankeyNodeMark
							key={node.id}
							label={`${node.node.label}: ${formatAmount(node.value)}`}
							dimmed={dimmed}
							onHover={(hovered) => { hoverNode(node.id, hovered); }}
							onSelect={() => { onSelectNode(node.node); }}
						>
							<SankeyNodeMark.Bar
								x={node.x}
								y={node.y}
								width={node.width}
								height={node.height}
								color={color}
							/>
							<ShowOnNodeLabelFits height={node.height}>
								<SankeyNodeMark.Label x={labels.x} y={labels.labelY} anchor={labels.anchor}>
									{node.node.label}
								</SankeyNodeMark.Label>
							</ShowOnNodeLabelFits>
							<ShowOnNodeValueFits height={node.height}>
								<SankeyNodeMark.Value x={labels.x} y={labels.valueY} anchor={labels.anchor}>
									{formatAmount(node.value)}
								</SankeyNodeMark.Value>
							</ShowOnNodeValueFits>
						</SankeyNodeMark>
					))}
				</g>
			</svg>
			<ShowOnHoverAt target={hoveredNode} at={hoveredNodeAnchor}>
				{(node, anchor) => (
					<ChartTooltip top={anchor.top} left={anchor.left}>
						<NodeTooltipContent
							node={node}
							color={colorOfNode(node.node)}
							totalInflow={totalInflow}
							currency={currency}
						/>
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
			<ShowOnHoverAt target={hoveredLink} at={hoveredLinkAnchor}>
				{(link, anchor) => (
					<ChartTooltip top={anchor.top} left={anchor.left}>
						<LinkTooltipContent
							link={link}
							color={colorOfLink(link)}
							totalInflow={totalInflow}
							currency={currency}
						/>
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</>
	);
};

MoneyFlowPlot.displayName = 'MoneyFlowPlot';

export { MoneyFlowPlot };
export type { MoneyFlowPlotProps };
