import { serializeAmount } from "@internal/shared";
import { convertRow } from "./selection.ts";

import type { MoneyDto } from "@internal/shared";
import type { TransactionBriefDto, WalletOptionDto, WalletRefDto } from "../../types.ts";
import type { MockLedger } from "./mock-ledger.ts";
import type { LedgerRow, LedgerWallet } from "./types.ts";


const FALLBACK_WALLET: WalletRefDto = { id: 'unknown', name: 'Unknown wallet', color: '#8a90a1' };

const iso = (instant: number): string => new Date(instant).toISOString();

const moneyDto = (amount: number, currency: string): MoneyDto => ({
	amount: serializeAmount(Math.round(amount * 100) / 100),
	currency,
});

const walletRefDto = (wallet: LedgerWallet): WalletRefDto => ({
	id: wallet.id,
	name: wallet.name,
	color: wallet.color,
});

const walletOptionDto = (wallet: LedgerWallet): WalletOptionDto => ({
	...walletRefDto(wallet),
	currency: wallet.currency,
});

const transactionBriefDto = (ledger: MockLedger, row: LedgerRow, currency: string): TransactionBriefDto => {
	const wallet = ledger.wallet(row.walletId);

	return {
		id: row.id,
		name: row.name,
		created_at: iso(row.createdAt),
		type: row.side,
		category: row.category,
		wallet: wallet ? walletRefDto(wallet) : FALLBACK_WALLET,
		money: moneyDto(row.amount, row.currency),
		converted: moneyDto(convertRow(row, currency), currency),
	};
};

const toRoundedPercent = (ratio: number): number => {
	const basisPoints = Math.round(ratio * 10_000);

	return basisPoints / 100;
};

const percentage = (part: number, total: number): number => {
	if (total === 0) {
		return 0;
	}

	return toRoundedPercent(part / total);
};

const changePercentage = (current: number, previous: number): number | null => {
	if (previous === 0) {
		return null;
	}

	const delta = current - previous;

	return toRoundedPercent(delta / previous);
};

export { changePercentage, iso, moneyDto, percentage, transactionBriefDto, walletOptionDto, walletRefDto };
