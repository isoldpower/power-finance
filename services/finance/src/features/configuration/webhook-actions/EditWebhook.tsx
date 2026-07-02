import { useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

import { useWebhookMethods } from "@feature/configuration";
import type { WebhookSchema } from "@feature/configuration";
import type { UpdateWebhookResponse } from "@feature/configuration";


interface EditWebhookProps {
	webhookId: string;
	handleSubmit: UseFormHandleSubmit<WebhookSchema>;
	onBeforeEdit?: () => void;
	onSuccess?: (result: UpdateWebhookResponse) => void;
	children?: ReactNode;
}

function EditWebhook({
	webhookId,
	handleSubmit,
	onSuccess,
	children,
	onBeforeEdit
}: EditWebhookProps) {
	const { updateWebhook } = useWebhookMethods(webhookId);

	const onSubmit = useCallback(async (data: WebhookSchema) => {
		if (onBeforeEdit) onBeforeEdit();
		const patchResponse = await updateWebhook(data);
		if (onSuccess) onSuccess(patchResponse);
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