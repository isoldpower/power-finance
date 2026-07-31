import {useMemo} from "react";
import {UseFormReturn, useWatch} from "react-hook-form";
import {QuickAddSchema} from "@feature/transactions";

import type {WalletSelectOption} from "@entity/wallets";


const useFormWalletsList = (
	walletOptions: WalletSelectOption[],
	form: UseFormReturn<QuickAddSchema>,
) => {
	const toWallet = useWatch({
		control: form.control,
		name: 'toWallet',
	});
	const fromWallet = useWatch({
		control: form.control,
		name: 'fromWallet',
	});
	
	const fromWalletOptions = useMemo(() => {
		return walletOptions.filter((option) => option.id !== toWallet);
	}, [toWallet, walletOptions]);
	const toWalletOptions = useMemo(() => {
		return walletOptions.filter((option) => option.id !== fromWallet);
	}, [fromWallet, walletOptions]);
	
	return {
		fromWalletOptions,
		toWalletOptions,
	};
}

export { useFormWalletsList };