const WALLETS_STORAGE_KEY = 'wallets-v1';

interface StoredWallet {
	id: string;
	name: string;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
	category: string;
	currency: string;
	opening_balance: string;
	zero_balance: string;
	favorite: boolean;
	color: string;
}

export { WALLETS_STORAGE_KEY };
export type { StoredWallet };
