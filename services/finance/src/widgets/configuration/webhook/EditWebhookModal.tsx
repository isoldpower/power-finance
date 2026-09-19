import { UiDialog, UiDialogHeader, UiDialogTitle, UiDialogTrigger } from "@internal/ui-library";
import { ModalContent, useDisclosure } from "@shared/overlays";
import { EditWebhookForm } from "./edit/EditWebhookForm.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WebhookEndpoint } from "@entity/configuration";


type EditWebhookModalProps = PropsWithChildren<{
	targetWebhook: WebhookEndpoint
}>;

const EditWebhookModal: FC<EditWebhookModalProps> = ({
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
						Edit Webhook
					</UiDialogTitle>
				</UiDialogHeader>
				<EditWebhookForm
					targetWebhook={targetWebhook}
					closeModal={onClose}
				/>
			</ModalContent>
		</UiDialog>
	);
}

EditWebhookModal.displayName = 'EditWebhookModal';

export { EditWebhookModal };
export type { EditWebhookModalProps };
