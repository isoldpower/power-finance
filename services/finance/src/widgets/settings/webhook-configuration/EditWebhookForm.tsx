import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormField } from "@internal/ui-library";
import { useCallback, useState } from "react";
import type { FC, PropsWithChildren } from "react";

import {
	EditWebhook,
	useEditDefaultValues, 
	webhookSchema,
} from "@feature/settings";
import { FieldLayout } from "@entity/transaction";
import { InputField } from "@shared/components";
import type { WebhookSchema } from "@feature/settings";
import type { WebhookEndpoint } from "@entity/settings";


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
		<Form {...form}>
			<EditWebhook
				onBeforeEdit={handleLoading}
				onSuccess={handleOnSuccess}
				webhookId={targetWebhook.id}
				handleSubmit={form.handleSubmit}
			>
				<div className="grid items-start gap-4">
					<FormField
						disabled={loading}
						control={form.control}
						name="title"
						render={({field}) => (
							<FieldLayout label="Webhook Title">
								<InputField placeholder="e.g., My Website Hook" {...field} />
							</FieldLayout>
						)} />
					<FormField
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
						<Button variant="default" type="submit">
							Save Changes
						</Button>
					</div>
				</div>
			</EditWebhook>
		</Form>
	);
}

export { EditWebhookForm };
export type { EditWebhookFormProps };
