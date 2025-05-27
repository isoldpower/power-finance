interface MoneyFlowPiece {
	source: MoneyFlowNode;
	target: MoneyFlowNode;
	value: number;
}

interface MoneyFlowNode {
	name: string;
	level: number;
}

export type { MoneyFlowPiece, MoneyFlowNode };