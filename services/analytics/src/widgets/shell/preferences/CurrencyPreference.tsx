import { DisplayText } from "@internal/shared";
import { PreferenceCombobox } from "@entity/shell";
import { useMainCurrencyLabel } from "@feature/shell";
import { DotList } from "@shared/text";

import type { FC } from "react";
import type { CurrencyMeta } from "@internal/shared";


interface CurrencyPreferenceProps {
	currencies: CurrencyMeta[];
	isSaving: boolean;
	onSelect: (code: string) => void;
	className?: string;
}

const CurrencyPreference: FC<CurrencyPreferenceProps> = ({ currencies, isSaving, onSelect, className }) => {
	const { mainCurrency, labelParts } = useMainCurrencyLabel(currencies);

	return (
		<PreferenceCombobox
			label={(
				<DotList>
					{labelParts}
				</DotList>
			)}
			searchPlaceholder="Search currency..."
			emptyLabel="No currency found."
			isSaving={isSaving}
			className={className}
		>
			{currencies.map((currency) => (
				<PreferenceCombobox.Option
					key={currency.code}
					value={`${currency.code} ${currency.name}`}
					lead={(
						<DisplayText as="span" size="13" truncate className="inline-block w-6 shrink-0 text-center">
							{currency.symbol}
						</DisplayText>
					)}
					title={currency.code}
					titleColumn
					caption={currency.name}
					selected={currency.code === mainCurrency}
					onSelect={() => { onSelect(currency.code); }}
				/>
			))}
		</PreferenceCombobox>
	);
};

CurrencyPreference.displayName = 'CurrencyPreference';

export { CurrencyPreference };
export type { CurrencyPreferenceProps };
