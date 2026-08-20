import { PreferencesPanel } from "@entity/configuration";
import { CurrencySelector, LocaleCombobox, TimezoneSelector } from "@widget/localization";

import type { FC } from "react";


const PreferencesSettings: FC = () => {
	return (
		<PreferencesPanel>
			<PreferencesPanel.Title description="Saved to your account, so they follow you to every device.">
				Regional preferences
			</PreferencesPanel.Title>
			<PreferencesPanel.Row
				label="Main currency"
				description="Balances and totals are converted into this currency."
			>
				<CurrencySelector variant="field" className="w-full" />
			</PreferencesPanel.Row>
			<PreferencesPanel.Row
				label="Locale"
				description="Sets how amounts and dates are written."
			>
				<LocaleCombobox variant="field" className="w-full" />
			</PreferencesPanel.Row>
			<PreferencesPanel.Row
				label="Timezone"
				description="Dates and times are shown in this zone."
			>
				<TimezoneSelector className="w-full" />
			</PreferencesPanel.Row>
		</PreferencesPanel>
	);
};

PreferencesSettings.displayName = 'PreferencesSettings';

export { PreferencesSettings };
