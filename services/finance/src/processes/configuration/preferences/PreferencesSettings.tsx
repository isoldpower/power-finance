import { SettingsLayout, SettingsSectionRow, SettingsSectionTitle } from "@entity/configuration";
import { CurrencySelector, LocaleCombobox, TimezoneSelector } from "@widget/localization";

import type { FC } from "react";


const PreferencesSettings: FC = () => {
	return (
		<SettingsLayout.Section>
			<SettingsSectionTitle>
				<SettingsSectionTitle.Info>
					<SettingsSectionTitle.Heading>
						Regional preferences
					</SettingsSectionTitle.Heading>
					<SettingsSectionTitle.Description>
						Saved to your account, so they follow you to every device.
					</SettingsSectionTitle.Description>
				</SettingsSectionTitle.Info>
			</SettingsSectionTitle>
			<SettingsSectionRow>
				<SettingsSectionRow.Info>
					<SettingsSectionRow.Label>
						Main currency
					</SettingsSectionRow.Label>
					<SettingsSectionRow.Description>
						Balances and totals are converted into this currency.
					</SettingsSectionRow.Description>
				</SettingsSectionRow.Info>
				<SettingsSectionRow.Control>
					<CurrencySelector variant="field" className="w-full" />
				</SettingsSectionRow.Control>
			</SettingsSectionRow>
			<SettingsSectionRow>
				<SettingsSectionRow.Info>
					<SettingsSectionRow.Label>
						Locale
					</SettingsSectionRow.Label>
					<SettingsSectionRow.Description>
						Sets how amounts and dates are written.
					</SettingsSectionRow.Description>
				</SettingsSectionRow.Info>
				<SettingsSectionRow.Control>
					<LocaleCombobox variant="field" className="w-full" />
				</SettingsSectionRow.Control>
			</SettingsSectionRow>
			<SettingsSectionRow>
				<SettingsSectionRow.Info>
					<SettingsSectionRow.Label>
						Timezone
					</SettingsSectionRow.Label>
					<SettingsSectionRow.Description>
						Dates and times are shown in this zone.
					</SettingsSectionRow.Description>
				</SettingsSectionRow.Info>
				<SettingsSectionRow.Control>
					<TimezoneSelector className="w-full" />
				</SettingsSectionRow.Control>
			</SettingsSectionRow>
		</SettingsLayout.Section>
	);
};

PreferencesSettings.displayName = 'PreferencesSettings';

export { PreferencesSettings };
