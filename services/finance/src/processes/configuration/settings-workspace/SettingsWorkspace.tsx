import { useCallback } from "react";
import { Icons } from "@internal/ui-library";
import { CategoriesSettings } from "@process/categories";
import { SettingsLayout, SETTINGS_SECTIONS } from "@entity/configuration";
import { useSelectSettingsTab, useSettingsPreferences } from "@feature/configuration";

import { PreferencesSettings } from "../preferences";
import { WebhookEndpoints } from "../webhook-actions";
import { SETTINGS_PAGE_HINT } from "./config.ts";

import type { FC } from "react";
import type { SettingsTab } from "@entity/configuration";
import { ShowOn } from "@internal/shared";


const SettingsWorkspace: FC = () => {
	const settingsTab = useSettingsPreferences((state) => state.settingsTab);
	const changeTab = useSelectSettingsTab();

	const selectPreferences = useCallback(() => { 
		changeTab('preferences');
	}, [changeTab]);
	const selectCategories = useCallback(() => { 
		changeTab('categories');
	}, [changeTab]);
	const selectWebhooks = useCallback(() => { 
		changeTab('webhooks');
	}, [changeTab]);
	const isTab = useCallback((tab: SettingsTab) => {
		return settingsTab === tab;
	}, [settingsTab]);

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
						active={isTab('categories')}
						onSelect={selectCategories}
						icon={<Icons.Tag size={15} />}
					>
						{SETTINGS_SECTIONS.categories}
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
					<ShowOn condition={isTab('preferences')}>
						<PreferencesSettings />
					</ShowOn>
					<ShowOn condition={isTab('categories')}>
						<CategoriesSettings />
					</ShowOn>
					<ShowOn condition={isTab('webhooks')}>
						<WebhookEndpoints />
					</ShowOn>
				</SettingsLayout.Content>
			</div>
		</SettingsLayout>
	);
};

SettingsWorkspace.displayName = 'SettingsWorkspace';

export { SettingsWorkspace };
