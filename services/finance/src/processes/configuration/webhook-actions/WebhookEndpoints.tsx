import { SettingsLayout, SettingsSectionTitle } from "@entity/configuration";
import { SITE_TOUR_ANCHORS } from "@feature/navigation";
import { useWebhooksList, WebhooksListFx } from "@feature/configuration";
import { Caption } from "@shared/pure-components/typography";
import { ShowOn } from "@shared/visibility";

import { CreateWebhook } from "./endpoints/CreateWebhook.tsx";
import { WebhookEndpointEntry } from "./endpoints/WebhookEndpointEntry.tsx";

import type { FC } from "react";


const WebhookEndpoints: FC = () => {
	const { webhooks, status } = useWebhooksList();

	return (
		<SettingsLayout.Section id={SITE_TOUR_ANCHORS.settingsWebhooks}>
			<SettingsSectionTitle>
				<SettingsSectionTitle.Info>
					<SettingsSectionTitle.Heading>
						Webhook endpoints
					</SettingsSectionTitle.Heading>
					<SettingsSectionTitle.Description>
						Each endpoint receives a signed POST for the events you pick.
					</SettingsSectionTitle.Description>
				</SettingsSectionTitle.Info>
				<SettingsSectionTitle.Action>
					<CreateWebhook />
				</SettingsSectionTitle.Action>
			</SettingsSectionTitle>
			<div className="flex flex-col gap-3">
				<WebhooksListFx status={status}>
					<ShowOn condition={webhooks.length === 0}>
						<Caption size="12">
							No endpoints yet. Add one to start receiving events.
						</Caption>
					</ShowOn>
					<ShowOn condition={webhooks.length > 0}>
						{webhooks.map((webhook) => (
							<WebhookEndpointEntry key={webhook.id} webhook={webhook} />
						))}
					</ShowOn>
				</WebhooksListFx>
			</div>
		</SettingsLayout.Section>
	);
};

WebhookEndpoints.displayName = 'WebhookEndpoints';

export { WebhookEndpoints };
