import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UiButton, UiForm, UiFormField } from "@internal/ui-library";
import { useCallback, useState } from "react";
import type { FC, PropsWithChildren } from "react";

import {
	EditWebhook,
	useEditDefaultValues, 
	webhookSchema,
} from "@feature/configuration";
import { FieldLayout } from "@shared/forms";
import { InputField } from "@shared/forms";
import type { WebhookSchema } from "@feature/configuration";
import type { WebhookEndpoint } from "@entity/configuration";


type EditWebhookFormProps = PropsWithChildren<{
	targetWebhook: WebhookEndpoint
	closeModal: () => void;
}>;

const EditWebhookForm: FC<EditWebhookFormProps> = ({
	targetWebhook,
	closeModal,
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	
	const defaultValues = useEditDefaultValues(targetWebhook);
	const form = useForm<WebhookSchema>({
		defaultValues,
		resolver: zodResolver(webhookSchema)
	});

	const handleOnSuccess = useCallback(() => {
		setLoading(false);
		closeModal();
	}, [closeModal]);

	const handleLoading = useCallback(() => {
		setLoading(true);
	}, []);

	return (
		<UiForm {...form}>
			<EditWebhook
				onBeforeEdit={handleLoading}
				onSuccess={handleOnSuccess}
				webhookId={targetWebhook.id}
				handleSubmit={form.handleSubmit}
			>
				<div className="grid items-start gap-4">
					<UiFormField
						disabled={loading}
						control={form.control}
						name="title"
						render={({field}) => (
							<FieldLayout label="Webhook Title">
								<InputField placeholder="e.g., My Website Hook" {...field} />
							</FieldLayout>
						)} />
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
						)} />
					<div className="flex justify-end">
						<UiButton variant="default" type="submit">
							Save Changes
						</UiButton>
					</div>
				</div>
			</EditWebhook>
		</UiForm>
	);
}

export { EditWebhookForm };
export type { EditWebhookFormProps };
