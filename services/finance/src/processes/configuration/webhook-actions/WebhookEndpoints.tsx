import { SettingsSection } from "@entity/configuration";
import { SITE_TOUR_ANCHORS } from "@feature/onboarding";
import { useWebhooksList, WebhooksListFx } from "@feature/configuration";
import { SkeletonText } from "@shared/pure-components/feedback";
import { Caption } from "@shared/pure-components/typography";

import { CreateWebhook } from "./CreateWebhook.tsx";
import { WebhookEndpointEntry } from "./WebhookEndpointEntry.tsx";
import { ENDPOINTS_EMPTY, ENDPOINTS_HINT, ENDPOINTS_UNAVAILABLE, ENDPOINT_SAMPLE_SIZE } from "./config.ts";

import type { FC } from "react";


const EndpointSkeleton: FC = () => (
	<div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
		<SkeletonText size="14.5" width="w-40" className="mb-2" />
		<SkeletonText size="11.5" width="w-64" />
	</div>
);

EndpointSkeleton.displayName = 'EndpointSkeleton';

const EndpointsUnavailable: FC = () => (
	<Caption size="12">
		{ENDPOINTS_UNAVAILABLE}
	</Caption>
);

EndpointsUnavailable.displayName = 'EndpointsUnavailable';

const WebhookEndpoints: FC = () => {
	const { webhooks, status } = useWebhooksList();

	return (
		<SettingsSection id={SITE_TOUR_ANCHORS.settingsWebhooks}>
			<SettingsSection.Title
				description={ENDPOINTS_HINT}
				action={<CreateWebhook />}
			>
				Webhook endpoints
			</SettingsSection.Title>
			<div className="flex flex-col gap-3">
				<WebhooksListFx
					status={status}
					fxSampleSize={ENDPOINT_SAMPLE_SIZE}
					pendingElement={<EndpointSkeleton />}
					errorElement={<EndpointsUnavailable />}
				>
					{webhooks.length === 0 ? (
						<Caption size="12">
							{ENDPOINTS_EMPTY}
						</Caption>
					) : webhooks.map((webhook) => (
						<WebhookEndpointEntry key={webhook.id} webhook={webhook} />
					))}
				</WebhooksListFx>
			</div>
		</SettingsSection>
	);
};

WebhookEndpoints.displayName = 'WebhookEndpoints';

export { WebhookEndpoints };
