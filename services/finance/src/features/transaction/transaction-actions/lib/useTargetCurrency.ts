import { useEffect } from "react";
import { useSettingsContext } from "@internal/shared";
import type { UseFormReturn } from "react-hook-form";

import { useWalletsList } from "@feature/wallet";
import type { TransactionSchema } from "../schemas.ts";


const useTargetCurrency = (
	form: UseFormReturn<TransactionSchema>
) => {
	const { mainCurrency } = useSettingsContext();
	const { wallets } = useWalletsList({ refetchOnMount: false, refetchOnReconnect: false });

	const type = form.watch('type');
	const from = form.watch('from');
	const to = form.watch('to');
	const target = form.watch('targetCurrency');

	useEffect(() => {
		console.log(target);
	}, [target]);

	useEffect(() => {
		if (form.getFieldState('targetCurrency').isTouched) return;

		const fromWallet = wallets.find((wallet) => wallet.id === from);
		const toWallet = wallets.find((wallet) => wallet.id === to);
		switch (type) {
			case 'transfer':
				form.setValue('targetCurrency', fromWallet?.currency ?? toWallet?.currency ?? mainCurrency);
				break;
			case 'expense':
				form.setValue('targetCurrency', fromWallet?.currency ?? mainCurrency);
				break;
			case 'income':
				form.setValue('targetCurrency', toWallet?.currency ?? mainCurrency);
				break;
			case 'adjust':
				form.setValue('targetCurrency', toWallet?.currency ?? mainCurrency);
				break;
			default:
				form.setValue('targetCurrency', mainCurrency);
				break;
		}
	}, [type, from, to]);
}

export { useTargetCurrency };