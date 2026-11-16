import type { Drill, WalletOption } from "@entity/filters";
import type { FlowNode } from "@entity/flow";


const flowNodeDrill = (node: FlowNode, wallets: WalletOption[]): Drill | null => {
	if (node.kind === 'income_category') {
		return { kind: 'category', side: 'income', category: node.category };
	}

	if (node.kind === 'expense_category') {
		return { kind: 'category', side: 'expense', category: node.category };
	}

	if (node.kind !== 'wallet') {
		return null;
	}

	const wallet = wallets.find((option) => option.id === node.wallet?.id);

	return wallet ? { kind: 'wallet', wallet } : null;
};

export { flowNodeDrill };
