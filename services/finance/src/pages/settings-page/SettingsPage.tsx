import { useShallow } from "zustand/react/shallow";
import {
	Icons,
	UiButton,
	UiTabs,
	UiTabsContent,
	UiTabsList,
	UiTabsTrigger,
} from "@internal/ui-library";
import { CreateWebhook, EditWebhookModal, DeleteWebhookModal } from "@process/configuration";
import {
	SettingsPreferencesProvider,
	useSettingsPreferences,
	useWebhooksList,
	WebhooksListEmptyUX,
	WebhooksListFx,
} from "@feature/configuration";
import { WebhookWithControls } from "@entity/configuration";

import type { FC } from 'react';
import type { SettingsTab } from "@entity/configuration";


// TODO: Implement Webhooks pagination and filtering
// TODO: Potentially optimize DOM size through using unified modals for deleting/editing webhooks.
const SettingsTabs: FC = () => {
	const { webhooks, status } = useWebhooksList();
	const { settingsTab, changeTab } = useSettingsPreferences(
		useShallow((state) => ({
			settingsTab: state.settingsTab,
			changeTab: state.changeTab,
		}))
	);

	return (
		<UiTabs
			value={settingsTab}
			onValueChange={(tab) => { changeTab(tab as SettingsTab); }}
			className="px-4"
		>
			<UiTabsList className="w-full justify-start">
				<UiTabsTrigger className="flex-0" value="preferences">
					Preferences
				</UiTabsTrigger>
				<UiTabsTrigger className="flex-0" value="webhooks">
					Webhooks
				</UiTabsTrigger>
			</UiTabsList>
			<div className="p-6 w-full">
				<UiTabsContent value="preferences">
					{/*<PreferencesModalBox>*/}
					{/*	<PreferredCurrencySelection/>*/}
					{/*	<GlobalLocaleSelection/>*/}
					{/*</PreferencesModalBox>*/}
				</UiTabsContent>
				<UiTabsContent value="webhooks">
					<div className="grid grid-cols-1 gap-4">
						<WebhooksListFx
							errorElement={<div>hello</div>}
							pendingElement={<div>World</div>}
							status={status}
							fxSampleSize={5}
						>
							<WebhooksListEmptyUX dataset={webhooks}>
								{webhooks.map((hook) => (
									<WebhookWithControls webhook={hook} key={hook.id}>
										<EditWebhookModal targetWebhook={hook}>
											<UiButton size="icon" variant="secondary">
												<Icons.Pencil />
											</UiButton>
										</EditWebhookModal>
										<DeleteWebhookModal targetWebhook={hook}>
											<UiButton size="icon" variant="destructive">
												<Icons.Trash2 />
											</UiButton>
										</DeleteWebhookModal>
									</WebhookWithControls>
								))}
							</WebhooksListEmptyUX>
						</WebhooksListFx>
					</div>
					<hr className="my-4" />
					<CreateWebhook />
				</UiTabsContent>
			</div>
		</UiTabs>
	);
};

SettingsTabs.displayName = 'SettingsTabs';

const SettingsPage: FC = () => {
	return (
		<SettingsPreferencesProvider>
			<div className="max-w-[1280px] mx-auto py-4 h-full">
				<SettingsTabs />
			</div>
		</SettingsPreferencesProvider>
	);
};

SettingsPage.displayName = 'SettingsPage';

export { SettingsPage };
