import type { Wallet } from "@entity/wallets";

interface TransactionDto {
	id: string;
	amount: string;
	currency_code: string;
	source_wallet: Wallet;
	created_at: string;
}

interface TransactionPreviewDto {
	id: string;
	amount: string;
	currency_code: string;
	source_wallet: Wallet;
	created_at: string;
}

export type { TransactionDto, TransactionPreviewDto };
