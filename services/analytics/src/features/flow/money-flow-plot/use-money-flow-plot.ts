import { useCallback, useMemo, useState } from "react";
import { nodeColor } from "@entity/flow";
import { useKeyedTransition } from "@shared/charts";
import { amountValue } from "@shared/formatting";
import { useSankeyLayout } from "../layout";
import { COMPACT_EDGE, LINK_FIELDS, NARROW_WIDTH, NODE_FIELDS, WIDE_LABEL_ROOM } from "./config.ts";
import { flowLinkPath } from "./plot-partials/flow-link-path.ts";
import { isNodeActive, linkEmphasis } from "./plot-partials/hover-emphasis.ts";
import { labelSideOf } from "./plot-partials/label-side.ts";
import { linkCategoryEnd } from "./plot-partials/link-category-end.ts";
import { nodeLabelLayout } from "./plot-partials/node-label-layout.ts";
import { linkTooltipAnchor, nodeTooltipAnchor } from "./plot-partials/tooltip-anchor.ts";
import { collapseLink, collapseNode } from "./plot-partials/transitions.ts";

import type { FlowNode, MoneyFlow } from "@entity/flow";
import type { PositionedLink } from "../layout";
import type { SankeyHover } from "./types.ts";


interface MoneyFlowPlotParams {
	flow: MoneyFlow;
	width: number;
	height: number;
	expenseColorOf: (key: string) => string;
}

const useMoneyFlowPlot = ({ flow, width, height, expenseColorOf }: MoneyFlowPlotParams) => {
	const [hover, setHover] = useState<SankeyHover>(null);
	const compact = width < NARROW_WIDTH;
	const labelRoom = compact ? COMPACT_EDGE : WIDE_LABEL_ROOM;

	const extent = useMemo(() => {
		return { width, height, labelRoom };
	}, [width, height, labelRoom]);
	const layout = useSankeyLayout(flow, extent);
	const { items: nodes } = useKeyedTransition(layout.nodes, { fields: NODE_FIELDS, enter: collapseNode });
	const { items: links } = useKeyedTransition(layout.links, { fields: LINK_FIELDS, enter: collapseLink });

	const totalInflow = useMemo(() => {
		const inflow = amountValue(flow.totalInflow);

		return inflow > 0 ? inflow : 1;
	}, [flow.totalInflow]);
	const colorOfNode = useCallback((node: FlowNode) => {
		return nodeColor(node, expenseColorOf);
	}, [expenseColorOf]);
	const colorOfLink = useCallback((link: PositionedLink) => {
		return colorOfNode(linkCategoryEnd(link));
	}, [colorOfNode]);

	const nodeMarks = useMemo(() => {
		return nodes.map((node) => ({
			node,
			color: colorOfNode(node.node),
			labels: nodeLabelLayout(node, labelSideOf(node.column, compact)),
			dimmed: !isNodeActive(node, hover, layout.links),
		}));
	}, [nodes, colorOfNode, compact, hover, layout.links]);
	const linkMarks = useMemo(() => {
		return links.map((link) => ({
			link,
			path: flowLinkPath(link),
			color: colorOfLink(link),
			emphasis: linkEmphasis(link, hover),
			categoryEnd: linkCategoryEnd(link),
		}));
	}, [links, colorOfLink, hover]);

	const hoveredNode = useMemo(() => {
		if (hover?.kind !== 'node') {
			return null;
		}

		return layout.nodes.find((node) => node.id === hover.id) ?? null;
	}, [hover, layout.nodes]);
	const hoveredLink = useMemo(() => {
		if (hover?.kind !== 'link') {
			return null;
		}

		return layout.links.find((link) => link.key === hover.key) ?? null;
	}, [hover, layout.links]);
	const hoveredNodeAnchor = useMemo(() => {
		return hoveredNode ? nodeTooltipAnchor(hoveredNode) : null;
	}, [hoveredNode]);
	const hoveredLinkAnchor = useMemo(() => {
		return hoveredLink ? linkTooltipAnchor(hoveredLink) : null;
	}, [hoveredLink]);

	const hoverNode = useCallback((id: string, hovered: boolean) => {
		setHover(hovered ? { kind: 'node', id } : null);
	}, []);
	const hoverLink = useCallback((key: string, hovered: boolean) => {
		setHover(hovered ? { kind: 'link', key } : null);
	}, []);

	return {
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
	};
};

export { useMoneyFlowPlot };
export type { MoneyFlowPlotParams };
