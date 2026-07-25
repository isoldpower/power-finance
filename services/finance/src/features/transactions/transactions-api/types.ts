import type { WalletPreview } from "@feature/wallets/wallets-api/types.ts";
import type { Money } from "@feature/localization";


interface TransactionPreviewWallet {
	id: string;
	name: string;
	balance: Money
}

interface TransactionPreview {
	id: string
	amount: string
	currency_code: string
	created_at: string
	wallet: TransactionPreviewWallet
}

interface TransactionDetailed {
	id: string
	amount: string
	currency_code: string
	wallet: WalletPreview
	created_at: string
}

interface TransactionMinimalPayload {
	source_wallet_id: string
	amount: string
}

export type { TransactionPreview, TransactionDetailed, TransactionMinimalPayload };
