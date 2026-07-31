import { goalProgressPercent, goalRemainingAmount } from "../goal-progress.ts";

import type { GoalWallet } from "../types.ts";
import type { FormatMoney, GoalView } from "./types.ts";


const toEtaLabel = (remaining: number, monthlyAmount: number, percent: number): string => {
	if (percent >= 100) return 'reached';
	if (monthlyAmount <= 0) return 'in progress';

	return `~${Math.ceil(remaining / monthlyAmount).toString()} mo left`;
};

const toGoalView = (wallet: GoalWallet, formatMoney: FormatMoney): GoalView => {
	const { currency } = wallet.balance;
	const { icon, color, targetAmount, monthlyAmount } = wallet.goal;
	const percent = goalProgressPercent(wallet);

	return {
		id: wallet.id,
		icon,
		color,
		name: wallet.name,
		monthly: formatMoney(monthlyAmount, currency),
		eta: toEtaLabel(goalRemainingAmount(wallet), monthlyAmount, percent),
		saved: formatMoney(wallet.balance.amount, currency),
		target: formatMoney(targetAmount, currency),
		percent,
	};
};

const toGoalViews = (wallets: GoalWallet[], formatMoney: FormatMoney): GoalView[] => {
	return wallets.map((wallet) => toGoalView(wallet, formatMoney));
};

export { toGoalView, toGoalViews };
