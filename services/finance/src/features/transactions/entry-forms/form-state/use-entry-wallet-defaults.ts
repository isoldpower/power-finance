import { useMemo } from "react";

import type { Wallet } from "@entity/wallets";
import type { TransactionEntryValues } from "../types.ts";


type EntryType = TransactionEntryValues['type'];

interface EntryWallets {
	fromWallet: string;
	toWallet: string;
}

const EMPTY_WALLETS: EntryWallets = { fromWallet: '', toWallet: '' };

const walletDefaultsFor = (
	type: EntryType,
	wallets: Wallet[],
	preferredWalletId?: string,
): EntryWallets => {
	if (wallets.length === 0) {
		return EMPTY_WALLETS;
	}

	const preferred = wallets.find((wallet) => {
		return wallet.id === preferredWalletId;
	}) ?? wallets[0];
	const counterpart = wallets.find((wallet) => {
		return wallet.id !== preferred.id;
	});

	return type === 'income'
		? {
			fromWallet: counterpart?.id ?? '',
			toWallet: preferred.id
		}
		: {
			fromWallet: preferred.id,
			toWallet: counterpart?.id ?? ''
		};
};

const useEntryWalletDefaults = (
	wallets: Wallet[],
	type: EntryType,
	preferredWalletId?: string,
): EntryWallets => {
	return useMemo(() => {
		return walletDefaultsFor(
			type,
			wallets,
			preferredWalletId,
		);
	}, [type, wallets, preferredWalletId]);
}

export { useEntryWalletDefaults, walletDefaultsFor };
export type { EntryType, EntryWallets };
