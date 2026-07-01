import { useCallback } from "react";
import { useSettingsContext } from "@internal/shared";
import type { FC } from "react";

import { CurrencyMenu } from "@entity/dashboard";

import { CURRENCIES } from "../config.ts";


interface CurrencySelectorProps {
	className?: string;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({ className }) => {
	const { mainCurrency, onUpdateField } = useSettingsContext();
	
	const onCurrencySelect = useCallback((code: string) => { 
		onUpdateField('mainCurrency', code); 
	}, [onUpdateField]);

	return (
		<CurrencyMenu
			currencies={CURRENCIES}
			mainCurrency={mainCurrency}
			onSelect={onCurrencySelect}
			className={className}
		/>
	);
};

CurrencySelector.displayName = 'CurrencySelector';

export { CurrencySelector };
export type { CurrencySelectorProps };
