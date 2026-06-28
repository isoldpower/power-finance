import type { FC } from "react";
import { useSettingsContext } from "@internal/shared";

import { CurrencyMenu } from "@entity/dashboard";

import { CURRENCIES } from "./config.ts";

interface CurrencySelectorProps {
	className?: string;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({ className }) => {
	const { mainCurrency, onUpdateField } = useSettingsContext();

	return (
		<CurrencyMenu
			currencies={CURRENCIES}
			mainCurrency={mainCurrency}
			onSelect={(code) => { onUpdateField('mainCurrency', code); }}
			className={className}
		/>
	);
};

CurrencySelector.displayName = 'CurrencySelector';

export { CurrencySelector };
export type { CurrencySelectorProps };
