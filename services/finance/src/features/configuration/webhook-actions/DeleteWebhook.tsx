import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useDeleteWebhook } from "../data-presenters";
import type { WebhookEndpoint } from "@entity/configuration";
import type { DeletedWebhookSchema } from "./schemas.ts";


interface DeleteWebhookProps {
	webhookId: string;
	handleSubmit: UseFormHandleSubmit<DeletedWebhookSchema>;
	onBeforeDelete?: () => void;
	onSuccess?: (webhook: WebhookEndpoint) => void;
	children?: ReactNode;
}

function DeleteWebhook({
	webhookId,
	handleSubmit,
	onSuccess,
	children,
	onBeforeDelete
}: DeleteWebhookProps) {
	const deleteWebhook = useDeleteWebhook(webhookId);

	const onSubmit = useCallback(async () => {
		if (onBeforeDelete) onBeforeDelete();

		const deleted = await deleteWebhook.mutateAsync();

		if (onSuccess) onSuccess(deleted);
	}, [deleteWebhook, onBeforeDelete, onSuccess]);

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

DeleteWebhook.displayName = 'DeleteWebhook';

export { DeleteWebhook };
export type { DeleteWebhookProps };
