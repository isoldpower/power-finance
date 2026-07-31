import type { GoalWallet, Wallet } from "./types.ts";


const isGoalWallet = (wallet: Wallet): wallet is GoalWallet => {
	return wallet.type === 'long-term-goal' && wallet.goal !== undefined;
};

export { isGoalWallet };
