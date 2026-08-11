import type { GoalWallet } from "../types.ts";


const goalProgressPercent = (wallet: GoalWallet): number => {
	const target = wallet.goal.targetAmount;

	if (target <= 0) return 0;

	return Math.min(100, Math.max(0, Math.round((wallet.balance.amount / target) * 100)));
};

const goalRemainingAmount = (wallet: GoalWallet): number => {
	return Math.max(0, wallet.goal.targetAmount - wallet.balance.amount);
};

export { goalProgressPercent, goalRemainingAmount };
