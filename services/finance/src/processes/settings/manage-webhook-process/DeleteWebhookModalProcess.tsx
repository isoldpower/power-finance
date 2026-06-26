import {
	UiDialog,
	UiDialogContent, 
	UiDialogDescription,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogTrigger,
} from "@internal/ui-library";
import {FC, PropsWithChildren, useCallback, useState} from "react";

import type { WebhookEndpoint } from "@entity/settings";
import { DeleteWebhookForm } from "@widget/settings";


type DeleteWebhookModalProps = PropsWithChildren<{
	targetWebhook: WebhookEndpoint
}>;

const DeleteWebhookModalProcess: FC<DeleteWebhookModalProps> = ({
	targetWebhook,
	children,
}) => {
	const [open, setOpen] = useState<boolean>(false);
	
	const closeModal = useCallback(() => {
		setOpen(false)
	}, []);
	
	return (
		<UiDialog open={open} onOpenChange={setOpen}>
			<UiDialogTrigger>
				{children}
			</UiDialogTrigger>
			<UiDialogContent>
				<UiDialogHeader>
					<UiDialogTitle>
						Delete Webhook
					</UiDialogTitle>
					<UiDialogDescription>
						Are you sure you want to delete the following Webhook?
					</UiDialogDescription>
				</UiDialogHeader>
				<DeleteWebhookForm 
					targetWebhook={targetWebhook} 
					closeModal={closeModal}
				/>
			</UiDialogContent>
		</UiDialog>
	);
}

export { DeleteWebhookModalProcess };
export type { DeleteWebhookModalProps };
