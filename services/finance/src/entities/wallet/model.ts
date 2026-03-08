interface Wallet {
	id: string;
	name: string;
	balance: { 
		amount: number;
		currency: string;
	}
	credit: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export type { Wallet };
