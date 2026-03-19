import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWebhookMethods } from "@feature/settings";
import type { DeleteWebhookResponse } from "@feature/settings";
import type { DeletedWebhookSchema } from "./schemas.ts";


interface DeleteWebhookProps {
	webhookId: string;
	handleSubmit: UseFormHandleSubmit<DeletedWebhookSchema>;
	onBeforeDelete?: () => void;
	onSuccess?: (result: DeleteWebhookResponse) => void;
	children?: ReactNode;
}

function DeleteWebhook({
	webhookId,
	handleSubmit,
	onSuccess,
	children,
	onBeforeDelete
}: DeleteWebhookProps) {
	const { deleteWebhook } = useWebhookMethods(webhookId);

	const onSubmit = useCallback(async () => {
		if (onBeforeDelete) onBeforeDelete();
		const deleteResponse = await deleteWebhook();
		if (onSuccess) onSuccess(deleteResponse);
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