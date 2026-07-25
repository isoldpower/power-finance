import {useMemo} from "react";
import {useTransactionsList} from "@feature/transactions";
import type {Wallet} from "@entity/wallets";


interface ReturnPayloadType {
	in: number
	out: number
}

const useWalletsPeriodFlow = (wallet: Wallet) => {
	const { transactions } = useTransactionsList();
	const walletTransactions = useMemo(() => (
		transactions
			.filter((transaction) => transaction.source_wallet.id === wallet.id)
			.sort((first, second) => second.created_at.localeCompare(first.created_at))
	), [transactions, wallet]);
	
	return useMemo(() => {
		const now = new Date();

		return walletTransactions.reduce<ReturnPayloadType>((accumulatedFlow, iterationTransaction) => {
			const createdParsed = new Date(iterationTransaction.created_at);
			if (createdParsed.getFullYear() !== now.getFullYear() || createdParsed.getMonth() !== now.getMonth()) {
				return accumulatedFlow;
			}

			const amount = parseFloat(iterationTransaction.amount) || 0;
			return amount >= 0
				? { ...accumulatedFlow, in: accumulatedFlow.in + amount }
				: { ...accumulatedFlow, out: accumulatedFlow.out + amount };
		}, { in: 0, out: 0 });
	}, [walletTransactions]);
}

export { useWalletsPeriodFlow };