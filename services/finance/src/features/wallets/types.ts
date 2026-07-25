type PanelMode = 'add' | 'scan' | 'wallet' | 'transfer' | 'edit';

interface PanelWallet {
	id: string;
	name: string;
	currency: string;
	credit: boolean;
	gradient: string;
	balance: { 
		amount: number;
		currency: string;
	};
}

export type { PanelMode, PanelWallet };
