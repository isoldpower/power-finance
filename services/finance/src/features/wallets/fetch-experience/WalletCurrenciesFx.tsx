import type { FC, ReactNode } from "react";
import type { CurrencyMeta } from "@entity/localization";


interface WalletCurrenciesFx {
	currencies: CurrencyMeta[]
	isPending: boolean;
	isError: boolean;
	children: ((currencies: CurrencyMeta[]) => ReactNode) | ReactNode;
}

const WalletCurrenciesFx: FC<WalletCurrenciesFx> = ({ isError, isPending, currencies, children }) => {
	if (isPending) {
		return (
			<div>Getting everything ready...</div>
		);
	} else if (isError || currencies.length === 0) {
		return (
			<div>Ooops, something went wrong :(</div>
		);
	}

	return typeof children === 'function'
		? children(currencies)
		: children;
}

export { WalletCurrenciesFx };