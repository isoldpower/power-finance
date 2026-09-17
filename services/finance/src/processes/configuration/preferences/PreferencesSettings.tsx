import { SettingsSection } from "@entity/configuration";
import { CurrencySelector, LocaleCombobox, TimezoneSelector } from "@widget/localization";

import type { FC } from "react";


const PreferencesSettings: FC = () => {
	return (
		<SettingsSection>
			<SettingsSection.Title description="Saved to your account, so they follow you to every device.">
				Regional preferences
			</SettingsSection.Title>
			<SettingsSection.Row
				label="Main currency"
				description="Balances and totals are converted into this currency."
			>
				<CurrencySelector variant="field" className="w-full" />
			</SettingsSection.Row>
			<SettingsSection.Row
				label="Locale"
				description="Sets how amounts and dates are written."
			>
				<LocaleCombobox variant="field" className="w-full" />
			</SettingsSection.Row>
			<SettingsSection.Row
				label="Timezone"
				description="Dates and times are shown in this zone."
			>
				<TimezoneSelector className="w-full" />
			</SettingsSection.Row>
		</SettingsSection>
	);
};

PreferencesSettings.displayName = 'PreferencesSettings';

export { PreferencesSettings };
