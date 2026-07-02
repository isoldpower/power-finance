import { currencySymbol } from "@shared/utils";

import type { Wallet } from "@entity/wallets";
import type { Goal } from "../types";
import { DEFAULT_GOAL_COLOR } from "@entity/wallets";


const parseAmount = (value: string): number => {
	return Number(value.replace(/[^0-9.]/g, '')) || 0;
}

const formatMoney = (amount: number, currency: string): string => {
	const grouped = Math.round(amount).toLocaleString('en-US');
	
	return `${currencySymbol(currency)}${grouped}`;
};

const walletToGoal = (wallet: Wallet): Goal => {
	const target = wallet.goal?.target ?? '$0';
	const monthly = wallet.goal?.monthly ?? '';
	const savedAmount = wallet.balance.amount;
	const targetAmount = parseAmount(target);
	const monthlyAmount = parseAmount(monthly);
	const remaining = Math.max(0, targetAmount - savedAmount);
	const percent = targetAmount > 0 ? Math.min(100, Math.max(0, Math.round((savedAmount / targetAmount) * 100))) : 0;

	const eta = percent >= 100
		? 'reached'
		: monthlyAmount > 0
			? `~${Math.ceil(remaining / monthlyAmount).toString()} mo left`
			: 'in progress';

	return {
		id: wallet.id,
		icon: wallet.goal?.icon ?? '🎯',
		color: wallet.goal?.color ?? DEFAULT_GOAL_COLOR,
		name: wallet.name,
		monthly,
		eta,
		saved: formatMoney(savedAmount, wallet.balance.currency),
		target,
		percent,
	};
};

export { walletToGoal };