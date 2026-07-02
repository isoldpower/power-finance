import { FC, useState } from "react";
import { useCallback } from "react";

import { NewWebhookForm, CreateWebhookFinishModal } from "@widget/configuration";
import {
	UiCard,
	UiCardContent,
	UiCardHeader,
	UiCardTitle,
} from "@internal/ui-library";
import type { WebhookEndpoint } from "@entity/configuration";


const CreateWebhookProcess: FC = () => {
	const [createdWebhook, setCreatedWebhook] = useState<WebhookEndpoint | null>(null);
	const [finishCreateOpen, setFinishCreateOpen] = useState<boolean>(false);
	
	const handleWebhookCreated = useCallback((webhook: WebhookEndpoint) => {
		setCreatedWebhook(webhook);
		setFinishCreateOpen(true);
	}, []);
	
	const handleFinishCreateOpenChange = useCallback((open: boolean) => {
		if (open && !createdWebhook) {
			throw Error("Attempt to open the WebhookFinishCreate modal while no data on create webhook is stored");
		}
		
		setFinishCreateOpen(open);
		if (!open) {
			setCreatedWebhook(null);
		}
	}, [createdWebhook]);
	
	return (
		<UiCard>
			<UiCardHeader>
				<UiCardTitle>
					Create New Webhook
				</UiCardTitle>
			</UiCardHeader>
			<UiCardContent>
				<NewWebhookForm onWebhookCreated={handleWebhookCreated} />
			</UiCardContent>
			<CreateWebhookFinishModal 
				open={finishCreateOpen}
				onOpenChange={handleFinishCreateOpenChange}
				webhook={createdWebhook}
			/>
		</UiCard>
	);
}

export { CreateWebhookProcess };