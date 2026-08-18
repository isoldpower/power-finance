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
import { useSettingsContext } from "@internal/shared";
import { LocalePickerLabel, LocalePickerOptionSelected } from "@entity/localization";
import { MetaText, Text } from "@shared/pure-components/typography";
import { useLocales, useSelectLocale } from "@feature/localization";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { LocalePickerVariant } from "@entity/localization";
import type { FC, ReactNode } from "react";


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
				<LocalePickerLabel variant={variant} locales={locales} placeholder={placeholder}>
					{currentLocale}
				</LocalePickerLabel>
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
							<Text weight="semibold" truncate>
								{locale.name}
							</Text>
							<MetaText size="10.5" truncate>
								{locale.region}
							</MetaText>
							<LocalePickerOptionSelected>
								{currentLocale === locale.tag}
							</LocalePickerOptionSelected>
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
