import { LocalePickerLabel, useLocales, useSettingsContext } from "@internal/shared";
import { PreferenceCombobox } from "@entity/shell";

import type { FC } from "react";


interface LocalePreferenceProps {
	isSaving: boolean;
	onSelect: (tag: string) => void;
	className?: string;
}

const LocalePreference: FC<LocalePreferenceProps> = ({ isSaving, onSelect, className }) => {
	const { locale: currentLocale } = useSettingsContext();
	const { locales } = useLocales();

	return (
		<PreferenceCombobox
			label={(
				<LocalePickerLabel variant="field" locales={locales}>
					{currentLocale}
				</LocalePickerLabel>
			)}
			searchPlaceholder="Search locale..."
			emptyLabel="No locale found."
			isSaving={isSaving}
			className={className}
		>
			{locales.map((locale) => (
				<PreferenceCombobox.Option
					key={locale.tag}
					value={`${locale.tag} ${locale.name} ${locale.region}`}
					title={locale.name}
					caption={locale.region}
					selected={locale.tag === currentLocale}
					onSelect={() => { onSelect(locale.tag); }}
				/>
			))}
		</PreferenceCombobox>
	);
};

LocalePreference.displayName = 'LocalePreference';

export { LocalePreference };
export type { LocalePreferenceProps };
