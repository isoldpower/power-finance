import type { Wallet, WalletPatch } from "@entity/wallets";


const patchWallet = <TWallet extends Wallet>(wallet: TWallet, patch: WalletPatch): TWallet => ({
	...wallet,
	name: patch.name ?? wallet.name,
	favorite: patch.favorite ?? wallet.favorite,
	category: patch.category ?? wallet.category,
	color: patch.color ?? wallet.color,
	zeroBalance: patch.zeroBalance === undefined
		? wallet.zeroBalance
		: { amount: patch.zeroBalance, currency: wallet.currency },
});

export { patchWallet };
