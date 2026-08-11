import {
	UiDialog,
	UiDialogContent, 
	UiDialogDescription,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogTrigger,
} from "@internal/ui-library";
import type {FC, PropsWithChildren} from "react";

import type { WebhookEndpoint } from "@entity/configuration";
import { DeleteWebhookForm } from "@widget/configuration";
import { useDisclosure } from "@shared/overlays";


type DeleteWebhookModalProps = PropsWithChildren<{
	targetWebhook: WebhookEndpoint
}>;

const DeleteWebhookModal: FC<DeleteWebhookModalProps> = ({
	targetWebhook,
	children,
}) => {
	const { open, setOpen, onClose } = useDisclosure();

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
					closeModal={onClose}
				/>
			</UiDialogContent>
		</UiDialog>
	);
}

export { DeleteWebhookModal };
export type { DeleteWebhookModalProps };
