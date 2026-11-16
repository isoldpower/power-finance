import { convertAmount } from "./rates.ts";

import type { MockLedger } from "./mock-ledger.ts";
import type { LedgerRow, LedgerWallet } from "./types.ts";


const signedNative = (row: LedgerRow, wallet: LedgerWallet): number => {
	const amount = convertAmount(row.amount, row.currency, wallet.currency);

	return row.side === 'income' ? amount : -amount;
};

const nativeBalancesAt = (ledger: MockLedger, wallet: LedgerWallet, instants: number[]): number[] => {
	const rows = ledger.rows().filter((row) => row.walletId === wallet.id);
	const balances: number[] = [];
	let cursor = 0;
	let balance = wallet.openingBalance;

	instants.forEach((instant) => {
		while (cursor < rows.length && rows[cursor].createdAt <= instant) {
			balance += signedNative(rows[cursor], wallet);
			cursor += 1;
		}
		balances.push(balance);
	});

	return balances;
};

const selectedWallets = (ledger: MockLedger, walletIds: string[] | null): LedgerWallet[] => {
	return walletIds === null
		? ledger.wallets()
		: ledger.wallets().filter((wallet) => walletIds.includes(wallet.id));
};

const totalBalancesAt = (
	ledger: MockLedger,
	wallets: LedgerWallet[],
	instants: number[],
	currency: string,
): number[] => {
	const perWallet = wallets.map((wallet) => {
		const nativeBalances = nativeBalancesAt(ledger, wallet, instants);

		return nativeBalances.map((balance) => convertAmount(balance, wallet.currency, currency));
	});

	return instants.map((_, index) => {
		return perWallet.reduce((sum, balances) => sum + balances[index], 0);
	});
};

export { nativeBalancesAt, selectedWallets, totalBalancesAt };
