import type { PanelWallet } from "../types.ts";

interface BrowserWallet extends PanelWallet {
	type?: string;
	updated: string;
}

export type { BrowserWallet };
