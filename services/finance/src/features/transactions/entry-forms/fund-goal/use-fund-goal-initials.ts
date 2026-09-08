import { useMemo } from "react";

import type { Goal, Wallet } from "@entity/wallets";
import type { FundGoalSchema } from "./fund-goal-schema.ts";


const useFundGoalInitials = (goal: Goal, wallets: Wallet[]): FundGoalSchema => {
	const sourceWalletId = wallets[0]?.id ?? '';

	return useMemo(() => ({
		type: 'transfer',
		name: goal.name,
		amount: '',
		receiveAmount: '',
		fromWallet: sourceWalletId,
		toWallet: goal.id,
	} satisfies FundGoalSchema), [goal.id, goal.name, sourceWalletId]);
}

export { useFundGoalInitials };
