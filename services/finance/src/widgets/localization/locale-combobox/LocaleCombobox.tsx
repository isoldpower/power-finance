import {
	cn,
	FinanceCombobox,
	FinanceComboboxContent,
	FinanceComboboxEmpty,
	FinanceComboboxInput,
	FinanceComboboxItem,
	FinanceComboboxList,
	FinanceComboboxTrigger,
} from "@internal/ui-library";
import { LocalePicker } from "@entity/localization";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { LocalePickerVariant } from "@entity/localization";
import type { FC, ReactNode } from "react";
import {useLocales, useSelectLocale} from "@feature/localization";
import {useSettingsContext} from "@internal/shared";


interface LocaleComboboxProps {
	variant?: LocalePickerVariant;
	pivot?: FinanceComboboxPivot;
	className?: string;
	placeholder?: string;
	notFound?: ReactNode;
}

const LocaleCombobox: FC<LocaleComboboxProps> = ({
	variant = 'field',
	pivot,
	className,
	placeholder,
	notFound,
}) => {
	const { locale: currentLocale } = useSettingsContext();
	const { locales } = useLocales();
	const onSelectLocale = useSelectLocale();
	
	return (
		<FinanceCombobox>
			<FinanceComboboxTrigger className={cn("w-full", className)}>
				<LocalePicker.Label variant={variant} locales={locales} placeholder={placeholder}>
					{currentLocale}
				</LocalePicker.Label>
			</FinanceComboboxTrigger>
			<FinanceComboboxContent pivot={pivot}>
				<FinanceComboboxInput placeholder="Search locale..." />
				<FinanceComboboxList>
					<FinanceComboboxEmpty>
						{notFound ?? "No locale found."}
					</FinanceComboboxEmpty>
					{locales.map((locale) => (
						<FinanceComboboxItem
							key={locale.tag}
							value={`${locale.tag} ${locale.name} ${locale.region}`}
							onSelect={() => { onSelectLocale(locale.tag); }}
						>
							<LocalePicker.OptionTitle>
								{locale.name}
							</LocalePicker.OptionTitle>
							<LocalePicker.OptionRegion>
								{locale.region}
							</LocalePicker.OptionRegion>
							<LocalePicker.OptionSelected>
								{currentLocale === locale.tag}
							</LocalePicker.OptionSelected>
						</FinanceComboboxItem>
					))}
				</FinanceComboboxList>
			</FinanceComboboxContent>
		</FinanceCombobox>
	);
};

LocaleCombobox.displayName = 'LocaleCombobox';

export { LocaleCombobox };
export type { LocaleComboboxProps };
