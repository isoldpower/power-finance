import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useUpdateWebhook } from "../data-presenters";
import type { WebhookEndpoint } from "@entity/configuration";
import type { WebhookSchema } from "./schemas.ts";


interface EditWebhookProps {
	webhookId: string;
	handleSubmit: UseFormHandleSubmit<WebhookSchema>;
	onBeforeEdit?: () => void;
	onSuccess?: (webhook: WebhookEndpoint) => void;
	children?: ReactNode;
}

function EditWebhook({
	webhookId,
	handleSubmit,
	onSuccess,
	children,
	onBeforeEdit
}: EditWebhookProps) {
	const updateWebhook = useUpdateWebhook(webhookId);

	const onSubmit = useCallback(async (data: WebhookSchema) => {
		if (onBeforeEdit) onBeforeEdit();

		const updated = await updateWebhook.mutateAsync({ title: data.title, url: data.url });

		if (onSuccess) onSuccess(updated);
	}, [updateWebhook, onBeforeEdit, onSuccess]);

	const handleSubmitForm = useCallback((
		e: FormEvent<HTMLFormElement>
	) => {
		handleSubmit(onSubmit)(e).catch(console.error);
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	);
}

EditWebhook.displayName = 'EditWebhook';

export { EditWebhook };
export type { EditWebhookProps };
