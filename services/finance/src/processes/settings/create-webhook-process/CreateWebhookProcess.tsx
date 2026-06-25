import { FC, useState } from "react";
import { useCallback } from "react";

import { NewWebhookForm, CreateWebhookFinishModal } from "@widget/settings";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@internal/ui-library";
import type { WebhookEndpoint } from "@entity/settings";


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
		<Card>
			<CardHeader>
				<CardTitle>
					Create New Webhook
				</CardTitle>
			</CardHeader>
			<CardContent>
				<NewWebhookForm onWebhookCreated={handleWebhookCreated} />
			</CardContent>
			<CreateWebhookFinishModal 
				open={finishCreateOpen}
				onOpenChange={handleFinishCreateOpenChange}
				webhook={createdWebhook}
			/>
		</Card>
	);
}

export { CreateWebhookProcess };