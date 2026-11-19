import { categoryKey } from "@entity/spending";
import { ACCENT_COLOR, INFLOW_COLOR, MUTED_INK, TOTAL_INK } from "@shared/charts";

import type { FlowNode } from "../types.ts";


const nodeColor = (node: FlowNode, expenseColorOf: (key: string) => string): string => {
	switch (node.kind) {
		case 'income_category': return INFLOW_COLOR;
		case 'expense_category': return expenseColorOf(categoryKey(node.category));
		case 'wallet': return node.wallet?.color ?? ACCENT_COLOR;
		case 'savings': return TOTAL_INK;
		case 'reserves': return MUTED_INK;
	}
};

export { nodeColor };
