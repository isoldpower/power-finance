import {FC, useCallback, useState} from "react";
import {UiButton, UiForm, UiFormField} from "@internal/ui-library";
import { FieldLayout } from "@shared/forms";
import { InputField } from "@shared/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	CreateWebhookResponse,
	NewWebhook,
	useNewDefaultValues,
	webhookSchema,
	type WebhookSchema
} from "@feature/configuration";
import { WebhookEndpoint } from "@entity/configuration";


interface NewWebhookModalProps {
	onWebhookCreated?: (data: WebhookEndpoint) => void;
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
	
	const handleOnSuccess = useCallback((response: CreateWebhookResponse) => {
		if(onWebhookCreated) {
			onWebhookCreated(response);
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
