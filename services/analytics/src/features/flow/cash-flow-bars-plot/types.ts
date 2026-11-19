type FlowSide = 'inflow' | 'outflow';

interface FlowBarView {
	key: string;
	index: number;
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	delay: number;
}

export type { FlowBarView, FlowSide };
