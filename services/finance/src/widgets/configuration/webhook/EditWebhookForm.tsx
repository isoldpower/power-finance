import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceButton, FinanceInput, UiForm, UiFormField } from "@internal/ui-library";
import { useCallback, useState } from "react";
import {
	EditWebhook,
	useEditDefaultValues, 
	webhookSchema,
} from "@feature/configuration";
import { FieldLayout } from "@shared/forms";

import type { FC, PropsWithChildren } from "react";
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
							<FieldLayout label="Name">
								<FinanceInput placeholder="e.g. Ledger sync" {...field} />
							</FieldLayout>
						)} />
					<UiFormField
						disabled={loading}
						control={form.control}
						name="url"
						render={({field}) => (
							<FieldLayout label="Endpoint URL">
								<FinanceInput
									placeholder="https://example.com/webhooks"
									type="url"
									{...field}
								/>
							</FieldLayout>
						)} />
					<div className="flex justify-end gap-2">
						<FinanceButton
							variant="secondary"
							type="button"
							disabled={loading}
							onClick={closeModal}
						>
							Cancel
						</FinanceButton>
						<FinanceButton type="submit" disabled={loading}>
							{loading ? 'Saving…' : 'Save changes'}
						</FinanceButton>
					</div>
				</div>
			</EditWebhook>
		</UiForm>
	);
}

export { EditWebhookForm };
export type { EditWebhookFormProps };
