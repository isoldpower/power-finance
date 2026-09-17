import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { Icons } from "@internal/ui-library";
import { SettingsLayout, SETTINGS_SECTIONS } from "@entity/configuration";
import { useSettingsPreferences } from "@feature/configuration";

import { PreferencesSettings } from "../preferences";
import { WebhookEndpoints } from "../webhook-actions";
import { SETTINGS_PAGE_HINT } from "./config.ts";

import type { FC } from "react";
import type { SettingsTab } from "@entity/configuration";


const SettingsWorkspace: FC = () => {
	const { settingsTab, changeTab } = useSettingsPreferences(
		useShallow((state) => ({
			settingsTab: state.settingsTab,
			changeTab: state.changeTab,
		}))
	);

	const selectPreferences = useCallback(() => { changeTab('preferences'); }, [changeTab]);
	const selectWebhooks = useCallback(() => { changeTab('webhooks'); }, [changeTab]);

	const isTab = (tab: SettingsTab): boolean => settingsTab === tab;

	return (
		<SettingsLayout>
			<SettingsLayout.Header description={SETTINGS_PAGE_HINT}>
				Settings
			</SettingsLayout.Header>
			<div className="flex flex-col gap-6 md:flex-row md:gap-8">
				<SettingsLayout.Nav>
					<SettingsLayout.NavItem
						active={isTab('preferences')}
						onSelect={selectPreferences}
						icon={<Icons.Settings2 size={15} />}
					>
						{SETTINGS_SECTIONS.preferences}
					</SettingsLayout.NavItem>
					<SettingsLayout.NavItem
						active={isTab('webhooks')}
						onSelect={selectWebhooks}
						icon={<Icons.Link2 size={15} />}
					>
						{SETTINGS_SECTIONS.webhooks}
					</SettingsLayout.NavItem>
				</SettingsLayout.Nav>
				<SettingsLayout.Content>
					{isTab('preferences') ? <PreferencesSettings /> : null}
					{isTab('webhooks') ? <WebhookEndpoints /> : null}
				</SettingsLayout.Content>
			</div>
		</SettingsLayout>
	);
};

SettingsWorkspace.displayName = 'SettingsWorkspace';

export { SettingsWorkspace };
