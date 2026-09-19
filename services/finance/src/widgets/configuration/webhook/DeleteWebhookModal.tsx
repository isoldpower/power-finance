import { UiDialog, UiDialogDescription, UiDialogHeader, UiDialogTitle, UiDialogTrigger } from "@internal/ui-library";
import { ModalContent, useDisclosure } from "@shared/overlays";
import { DeleteWebhookForm } from "./delete/DeleteWebhookForm.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WebhookEndpoint } from "@entity/configuration";


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
			<ModalContent>
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
			</ModalContent>
		</UiDialog>
	);
}

DeleteWebhookModal.displayName = 'DeleteWebhookModal';

export { DeleteWebhookModal };
export type { DeleteWebhookModalProps };
