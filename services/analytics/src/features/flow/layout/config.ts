import type { SankeyLayout } from "./types.ts";


const NODE_WIDTH = 12;
const NODE_PADDING = 12;
const VERTICAL_INSET = 8;
const NODE_LABEL_MIN_HEIGHT = 9;
const NODE_VALUE_MIN_HEIGHT = 26;

const EMPTY_LAYOUT: SankeyLayout = { nodes: [], links: [] };

export {
	EMPTY_LAYOUT,
	NODE_LABEL_MIN_HEIGHT,
	NODE_PADDING,
	NODE_VALUE_MIN_HEIGHT,
	NODE_WIDTH,
	VERTICAL_INSET,
};
