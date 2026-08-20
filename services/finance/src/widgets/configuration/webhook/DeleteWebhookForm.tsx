import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UiButton, UiForm, UiFormField } from "@internal/ui-library";
import { DeleteWebhook, deleteWebhookSchema, useDeleteDefaultValues } from "@feature/configuration";
import { FieldLayout } from "@shared/forms";
import { InputField } from "@shared/forms";

import type { FC, PropsWithChildren } from "react";
import type { WebhookEndpoint } from "@entity/configuration";
import type { DeletedWebhookSchema } from "@feature/configuration";


type DeleteWebhookFormProps = PropsWithChildren<{
	targetWebhook: WebhookEndpoint
	closeModal: () => void;
}>;

const DeleteWebhookForm: FC<DeleteWebhookFormProps> = ({
	targetWebhook,
	closeModal,
}) => {
	const defaultValues = useDeleteDefaultValues(targetWebhook);
	const form = useForm<DeletedWebhookSchema>({
		defaultValues,
		resolver: zodResolver(deleteWebhookSchema)
	});
	
	return (
		<UiForm {...form}>
			<DeleteWebhook 
				onSuccess={closeModal}
				webhookId={targetWebhook.id}
				handleSubmit={form.handleSubmit}
			>
				<div className="space-y-4">
					<UiFormField
						control={form.control}
						name="id"
						render={({ field }) => (
							<FieldLayout label="Target ID">
								<InputField disabled={true} placeholder="Oooops...." {...field} />
							</FieldLayout>
						)} />
					<div className="flex gap-2 justify-end">
						<UiButton variant='secondary' type='button' onClick={closeModal}>
							Cancel
						</UiButton>
						<UiButton variant='destructive' type='submit'>
							Delete
						</UiButton>
					</div>
				</div>
			</DeleteWebhook>
		</UiForm>
	);
} 

export { DeleteWebhookForm };
export type { DeleteWebhookFormProps };
