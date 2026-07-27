import { useMemo } from "react";

import type { Wallet } from "@entity/wallets";
import type { QuickAddSchema } from "./quick-add-schema.ts";


const useQuickAddInitials = (wallets: Wallet[]): QuickAddSchema => {
	const [fromWallet, toWallet] = useMemo(() => {
		if (wallets.length === 0) return ['', ''];

		const first = wallets[0];
		const second = wallets.find((wallet) => wallet.id !== first.id);

		return [first.id, second?.id ?? ''];
	}, [wallets]);

	return useMemo(() => ({
		fromWallet,
		toWallet,
		type: 'expense',
		amount: '',
		receiveAmount: '',
	} satisfies QuickAddSchema), [fromWallet, toWallet]);
}

export { useQuickAddInitials };
