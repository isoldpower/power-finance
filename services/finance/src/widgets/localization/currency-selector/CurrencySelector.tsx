import { useCallback } from "react";
import { useSettingsContext } from "@internal/shared";
import { FinanceMenu, FinanceMenuContent, FinanceMenuTrigger } from "@internal/ui-library";
import { SelectableCurrency, SelectableCurrencyShortcut } from "@entity/localization";
import type { FC } from "react";

import { CURRENCIES } from "../config.ts";
import { PreservedButton } from "@shared/interactions";


interface CurrencySelectorProps {
	className?: string;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({ className }) => {
	const { mainCurrency, onUpdateField } = useSettingsContext();
	
	const onCurrencySelect = useCallback((code: string) => { 
		onUpdateField('mainCurrency', code); 
	}, [onUpdateField]);
	
	return (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				<SelectableCurrency className={className}>
					{mainCurrency} <span className="text-[10px] text-text-3">▾</span>
				</SelectableCurrency>
			</FinanceMenuTrigger>
			<FinanceMenuContent align="end" className="min-w-[190px] p-1">
				{CURRENCIES.map((currency) => (
					<PreservedButton key={currency.code} callback={() => { onCurrencySelect(currency.code); }}>
						<SelectableCurrencyShortcut>
							<span className="w-3.5 font-display font-semibold">
								{currency.symbol}
							</span>
							<span className="w-8 font-semibold">
								{currency.code}
							</span>
							<span className="font-numeric text-[10.5px] text-text-3">
								{currency.name}
							</span>
							<span className="ml-auto w-3 text-center font-semibold text-primary">
								{mainCurrency === currency.code ? '✓' : ''}
							</span>
						</SelectableCurrencyShortcut>
					</PreservedButton>
				))}
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

CurrencySelector.displayName = 'CurrencySelector';

export { CurrencySelector };
export type { CurrencySelectorProps };
