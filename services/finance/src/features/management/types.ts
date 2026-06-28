// View model for the management slide-over panel, shared by the page, the section widgets that
// open it, and the panel process itself.
type PanelMode = 'add' | 'scan' | 'wallet' | 'transfer' | 'edit';

interface PanelWallet {
	id: string;
	name: string;
	currency: string;
	credit: boolean;
	gradient: string;
	balance: { amount: number; currency: string };
}

export type { PanelMode, PanelWallet };
