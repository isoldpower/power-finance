import { useState } from "react";
import { useCallback } from "react";
import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@internal/ui-library";
import { NewWebhookForm, CreateWebhookFinishModal } from "@widget/configuration";

import type { WebhookEndpointSecret } from "@entity/configuration";
import type { FC } from "react";


const CreateWebhook: FC = () => {
	const [createdWebhook, setCreatedWebhook] = useState<WebhookEndpointSecret | null>(null);
	const [finishCreateOpen, setFinishCreateOpen] = useState<boolean>(false);
	
	const handleWebhookCreated = useCallback((webhook: WebhookEndpointSecret) => {
		setCreatedWebhook(webhook);
		setFinishCreateOpen(true);
	}, []);
	
	const handleFinishCreateOpenChange = useCallback((isNowOpen: boolean) => {
		if (isNowOpen && !createdWebhook) throw Error(
			"Attempt to open the WebhookFinishCreate modal while no data on create webhook is stored"
		);
		
		setFinishCreateOpen(isNowOpen);
		if (!isNowOpen) {
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

export { CreateWebhook };