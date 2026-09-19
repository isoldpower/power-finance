import { compareAmounts, isZeroAmount, subtractAmounts, ZERO_AMOUNT } from "@shared/api";

import type { Money } from "@entity/localization";
import type { Wallet } from "../types.ts";


const walletOwnedMoney = (wallet: Wallet): Money => ({
	amount: subtractAmounts(
		wallet.balance.amount,
		wallet.zeroBalance.amount,
	),
	currency: wallet.balance.currency,
});

const walletOwedMoney = (wallet: Wallet): Money => {
	const owned = walletOwnedMoney(wallet);

	return {
		amount: compareAmounts(owned.amount, ZERO_AMOUNT) < 0
			? subtractAmounts(
				wallet.zeroBalance.amount,
				wallet.balance.amount,
			)
			: ZERO_AMOUNT,
		currency: wallet.balance.currency,
	};
};

const walletIsSettled = (wallet: Wallet): boolean => {
	return isZeroAmount(
		subtractAmounts(
			wallet.balance.amount,
			wallet.zeroBalance.amount,
		)
	);
};

const walletHasCreditLine = (wallet: Wallet): boolean => {
	return !isZeroAmount(wallet.zeroBalance.amount);
};

export { walletHasCreditLine, walletIsSettled, walletOwedMoney, walletOwnedMoney };
