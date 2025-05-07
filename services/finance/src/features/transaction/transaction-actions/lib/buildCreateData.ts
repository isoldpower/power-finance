import { convertCurrency } from "@shared/external-api";
import type { TransactionSchema, TransactionValuableFields } from "@feature/transaction";
import type { Wallet } from "@entity/wallet";


const convertFromTo = async (
	amount: number,
	from: string,
	to: string
) => {
	const rate = await convertCurrency(from, to);

	return amount * rate.rate;
};

const getWalletValue = (
	walletId: string | undefined,
	data: TransactionSchema,
	wallets: Wallet[],
) => {
	const wallet = wallets.find((wallet) => wallet.id === walletId);
	if (!wallet) return;

	return convertFromTo(data.amount, data.targetCurrency, wallet.currency)
		.then((value) => value * (wallet.reversed ? -1 : 1));
}

const buildCreateData = async (
	wallets: Wallet[],
	data: TransactionSchema,
	both = false
): Promise<TransactionValuableFields> => {
	const fromWallet = getWalletValue(data.from, data, wallets);
	const toWallet = getWalletValue(data.to, data, wallets);
	const resolvedValues = await Promise.all([fromWallet, toWallet]);
	if (
		(both && (!resolvedValues[0] || !resolvedValues[1])) ||
		(!both && !resolvedValues[0] && !resolvedValues[1])
	) {
		throw new Error('Invalid wallet values');
	}

	return {
		description: data.description,
		from: data.from && resolvedValues[0] ? {
			wallet: data.from,
			amount: resolvedValues[0]
		} : undefined,
		to: data.to && resolvedValues[1] ? {
			wallet: data.to,
			amount: resolvedValues[1]
		} : undefined,
		type: data.type as TransactionValuableFields['type']
	} satisfies TransactionValuableFields;
};

export { buildCreateData };