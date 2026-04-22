import type { WalletPreview } from "@feature/wallet/api-clients/types.ts";

interface TransactionPreview {
	id: string
	amount: string
	currency_code: string
	source_wallet_id: string
	created_at: string
}

interface TransactionDetailed {
	id: string
	amount: string
	currency_code: string
	source_wallet: WalletPreview
	created_at: string
}

interface TransactionMinimalPayload {
	source_wallet_id: string
	amount: string
}

export type { TransactionPreview, TransactionDetailed, TransactionMinimalPayload };
