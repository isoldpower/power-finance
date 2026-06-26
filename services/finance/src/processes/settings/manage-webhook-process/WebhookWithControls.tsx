import type { FC } from 'react';

import {
	UiButton,
	UiCardDescription,
	UiCardTitle,
	Icons
} from "@internal/ui-library";
import type { WebhookEndpoint } from "@entity/settings";

import { DeleteWebhookModalProcess } from "./DeleteWebhookModalProcess.tsx";
import { EditWebhookModalProcess } from "./EditWebhookModalProcess.tsx";


interface WebhookWithControlsProps {
	webhook: WebhookEndpoint;
}

// TODO: Potentially optimize DOM size through using unified models for deleting/editing webhooks.
const WebhookWithControls: FC<WebhookWithControlsProps> = ({
	webhook
}) => {
	return (
		<div className="p-2">
			<div className="flex justify-between items-center">
				<div className="flex flex-col gap-2">
					<UiCardTitle className="mb-0! pb-0!">
						{webhook.title}
					</UiCardTitle>
					<UiCardDescription className="mt-0! pt-0!">
						{webhook.url}
					</UiCardDescription>
				</div>
				<div className="flex gap-2 items-center">
					<EditWebhookModalProcess targetWebhook={webhook}>
						<UiButton size="icon" variant="secondary">
							<Icons.Pencil />
						</UiButton>
					</EditWebhookModalProcess>
					<DeleteWebhookModalProcess targetWebhook={webhook}>
						<UiButton size="icon" variant="destructive">
							<Icons.Trash2 />
						</UiButton>
					</DeleteWebhookModalProcess>
				</div>
			</div>
		</div>
	);
};

export { WebhookWithControls };
export type { WebhookWithControlsProps };
