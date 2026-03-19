import type { FC } from 'react';

import {
	Button,
	CardDescription,
	CardTitle,
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
					<CardTitle className="mb-0! pb-0!">
						{webhook.title}
					</CardTitle>
					<CardDescription className="mt-0! pt-0!">
						{webhook.url}
					</CardDescription>
				</div>
				<div className="flex gap-2 items-center">
					<EditWebhookModalProcess targetWebhook={webhook}>
						<Button size="icon" variant="secondary">
							<Icons.Pencil />
						</Button>
					</EditWebhookModalProcess>
					<DeleteWebhookModalProcess targetWebhook={webhook}>
						<Button size="icon" variant="destructive">
							<Icons.Trash2 />
						</Button>
					</DeleteWebhookModalProcess>
				</div>
			</div>
		</div>
	);
};

export { WebhookWithControls };
export type { WebhookWithControlsProps };
