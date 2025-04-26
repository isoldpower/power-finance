interface Wallet {
	id: string;
	name: string;
	currency: string;
	balance: number;
	createdAt?: string;
	updatedAt?: string;
}

export type { Wallet };
