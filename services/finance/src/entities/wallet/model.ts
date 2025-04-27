interface Wallet {
	id: string;
	name: string;
	currency: string;
	balance: number;
	reversed: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export type { Wallet };
