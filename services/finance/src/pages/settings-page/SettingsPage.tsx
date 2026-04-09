import type { FC } from 'react';

import {
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@internal/ui-library";

import { PreferencesModalBox } from "@entity/settings";
import { useWebhooksList, WebhooksListFx, WebhooksListEmptyUX } from "@feature/settings";
import { GlobalLocaleSelection, PreferredCurrencySelection } from "@widget/settings";
import { WebhookWithControls, CreateWebhookProcess } from "@process/settings";
import { TabsWithSearchParam } from "@shared/components";


// TODO: Implement Webhooks pagination and filtering
const SettingsPage: FC = () => {
	const { webhooks, status } = useWebhooksList();
	
	return (
		<div className="max-w-[1280px] mx-auto py-4 h-full">
			<TabsWithSearchParam
				searchParam="current"
				defaultValue="preferences"
				className="px-4"
			>
				<TabsList className="w-full justify-start">
					<TabsTrigger className="flex-0" value="preferences">
						Preferences
					</TabsTrigger>
					<TabsTrigger className="flex-0" value="webhooks">
						Webhooks
					</TabsTrigger>
				</TabsList>
				<div className="p-6 w-full">
					<TabsContent value="preferences">
						<PreferencesModalBox>
							<PreferredCurrencySelection/>
							<GlobalLocaleSelection/>
						</PreferencesModalBox>
					</TabsContent>
					<TabsContent value="webhooks">
						<div className="grid grid-cols-1 gap-4">
							<WebhooksListFx
								errorElement={<div>hello</div>}
								pendingElement={<div>World</div>}
								status={status}
								fxSampleSize={5}
							>
								<WebhooksListEmptyUX dataset={webhooks}>
									{webhooks.map((hook) => (
										<WebhookWithControls webhook={hook} key={hook.id} />
									))}
								</WebhooksListEmptyUX>
							</WebhooksListFx>
						</div>
						<hr className="my-4" />
						<CreateWebhookProcess />
					</TabsContent>
				</div>
			</TabsWithSearchParam>
		</div>
	);
};

export { SettingsPage };
export default SettingsPage;