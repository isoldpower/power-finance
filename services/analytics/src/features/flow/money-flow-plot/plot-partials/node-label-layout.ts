import { NODE_VALUE_MIN_HEIGHT } from "../../layout";
import { LABEL_GAP, LABEL_RAISE_WITH_VALUE, VALUE_DROP } from "../config.ts";

import type { LabelSide } from "../types.ts";


interface NodeLabelLayout {
	x: number;
	anchor: 'start' | 'end';
	labelY: number;
	valueY: number;
}

interface NodeBox {
	x: number;
	y: number;
	width: number;
	height: number;
}

const nodeLabelLayout = (node: NodeBox, side: LabelSide): NodeLabelLayout => {
	const middle = node.y + node.height / 2;
	const valueFits = node.height >= NODE_VALUE_MIN_HEIGHT;
	const rightEdge = node.x + node.width;

	return {
		x: side === 'left' ? node.x - LABEL_GAP : rightEdge + LABEL_GAP,
		anchor: side === 'left' ? 'end' : 'start',
		labelY: valueFits ? middle - LABEL_RAISE_WITH_VALUE : middle,
		valueY: middle + VALUE_DROP,
	};
};

export { nodeLabelLayout };
export type { NodeLabelLayout };
