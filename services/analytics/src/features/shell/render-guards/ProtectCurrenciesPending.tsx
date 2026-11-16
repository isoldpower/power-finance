import { useCurrencies } from "../data-presenters";

import type { FC, ReactNode } from "react";
import type { CurrencyMeta } from "@internal/shared";


interface ProtectCurrenciesPendingProps {
	fallback: ReactNode;
	children: (currencies: CurrencyMeta[]) => ReactNode;
}

const ProtectCurrenciesPending: FC<ProtectCurrenciesPendingProps> = ({ fallback, children }) => {
	const { currencies, isPending } = useCurrencies();

	if (isPending) {
		return fallback;
	}

	return children(currencies);
};

ProtectCurrenciesPending.displayName = 'ProtectCurrenciesPending';

export { ProtectCurrenciesPending };
export type { ProtectCurrenciesPendingProps };
