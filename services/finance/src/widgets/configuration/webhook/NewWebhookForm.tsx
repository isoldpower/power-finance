import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FinanceButton, FinanceInput, UiForm, UiFormField } from "@internal/ui-library";
import { FieldLayout } from "@shared/forms";
import { NewWebhook, useNewDefaultValues, webhookSchema } from "@feature/configuration";

import type { FC } from "react";
import type { WebhookEndpointSecret } from "@entity/configuration";
import type { WebhookSchema } from "@feature/configuration";


interface NewWebhookFormProps {
	onWebhookCreated?: (data: WebhookEndpointSecret) => void;
	onCancel?: () => void;
}

const NewWebhookForm: FC<NewWebhookFormProps> = ({ onWebhookCreated, onCancel }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const defaults = useNewDefaultValues();
	const form = useForm<WebhookSchema>({
		resolver: zodResolver(webhookSchema),
		defaultValues: defaults,
	});

	const handleOnSuccess = useCallback((webhook: WebhookEndpointSecret) => {
		setLoading(false);
		form.reset();
		onWebhookCreated?.(webhook);
	}, [form, onWebhookCreated]);

	const handleFailure = useCallback(() => {
		setLoading(false);
	}, []);

	const handleLoading = useCallback(() => {
		setLoading(true);
	}, []);

	return (
		<UiForm {...form}>
			<NewWebhook
				onBeforeCreate={handleLoading}
				onSuccess={handleOnSuccess}
				onFailure={handleFailure}
				handleSubmit={form.handleSubmit}
			>
				<div className="flex flex-col gap-4">
					<UiFormField
						disabled={loading}
						control={form.control}
						name="title"
						render={({ field }) => (
							<FieldLayout label="Name">
								<FinanceInput placeholder="e.g. Ledger sync" {...field} />
							</FieldLayout>
						)}
					/>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="url"
						render={({ field }) => (
							<FieldLayout label="Endpoint URL">
								<FinanceInput
									placeholder="https://example.com/webhooks"
									type="url"
									{...field}
								/>
							</FieldLayout>
						)}
					/>
				</div>
				<div className="mt-5 flex justify-end gap-2">
					{onCancel === undefined ? null : (
						<FinanceButton
							type="button"
							variant="secondary"
							disabled={loading}
							onClick={onCancel}
						>
							Cancel
						</FinanceButton>
					)}
					<FinanceButton type="submit" disabled={loading}>
						{loading ? 'Creating…' : 'Create endpoint'}
					</FinanceButton>
				</div>
			</NewWebhook>
		</UiForm>
	);
};

NewWebhookForm.displayName = 'NewWebhookForm';

export { NewWebhookForm };
export type { NewWebhookFormProps };
