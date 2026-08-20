import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UiButton, UiForm, UiFormField } from "@internal/ui-library";
import { FieldLayout } from "@shared/forms";
import { InputField } from "@shared/forms";
import { NewWebhook, useNewDefaultValues, webhookSchema } from "@feature/configuration";

import type { FC } from "react";
import type { WebhookEndpointSecret } from "@entity/configuration";
import type { WebhookSchema } from "@feature/configuration";

interface NewWebhookModalProps {
	onWebhookCreated?: (data: WebhookEndpointSecret) => void;
}

const NewWebhookForm: FC<NewWebhookModalProps> = ({
	onWebhookCreated
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	
	const defaults = useNewDefaultValues()
	const form = useForm<WebhookSchema>({
		resolver: zodResolver(webhookSchema),
		defaultValues: defaults
	});
	
	const handleOnSuccess = useCallback((webhook: WebhookEndpointSecret) => {
		if(onWebhookCreated) {
			onWebhookCreated(webhook);
		}
		
		form.reset();
		setLoading(false);
	}, [form, onWebhookCreated]);
	
	const handleLoading = useCallback(() => {
		setLoading(true);
	}, []);
	
	return (
		<UiForm {...form}>
			<NewWebhook 
				onBeforeCreate={handleLoading} 
				onSuccess={handleOnSuccess} 
				handleSubmit={form.handleSubmit}
			>
				<div className="grid items-start grid-cols-2 gap-4">
					<UiFormField
						disabled={loading}
						control={form.control}
						name="title"
						render={({field}) => (
							<FieldLayout label="Webhook Title">
								<InputField placeholder="e.g., My Website Hook" {...field} />
							</FieldLayout>
						)}/>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="url"
						render={({field}) => (
							<FieldLayout label="Endpoint URL">
								<InputField
									placeholder="https://example.com/webhooks"
									type="url"
									{...field}
								/>
							</FieldLayout>
						)}/>
				</div>
				<div className="pt-4">
					<UiButton variant="default" type="submit" disabled={loading}>
						Create Webhook
					</UiButton>
				</div>
			</NewWebhook>
		</UiForm>
	);
}

export { NewWebhookForm };
export type { NewWebhookModalProps };
