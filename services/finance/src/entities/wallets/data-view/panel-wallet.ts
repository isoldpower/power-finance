import { DEFAULT_WALLET_COLOR, isWalletColor } from "../visual-map";

import type { PanelWallet, Wallet } from "../types.ts";


const toPanelWallet = (wallet: Wallet): PanelWallet => ({
	id: wallet.id,
	name: wallet.name,
	category: wallet.category,
	currency: wallet.currency,
	color: isWalletColor(wallet.color) ? wallet.color : DEFAULT_WALLET_COLOR,
	balance: wallet.balance,
});

export { toPanelWallet };
