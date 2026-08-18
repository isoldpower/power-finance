import {
	UiDialog,
	UiDialogContent,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogTrigger,
} from "@internal/ui-library";
import { EditWebhookForm } from "@widget/configuration";
import { useDisclosure } from "@shared/overlays";

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
			<UiDialogContent>
				<UiDialogHeader>
					<UiDialogTitle>
						Edit Webhook
					</UiDialogTitle>
				</UiDialogHeader>
				<EditWebhookForm
					targetWebhook={targetWebhook}
					closeModal={onClose}
				/>
			</UiDialogContent>
		</UiDialog>
	);
}

export { EditWebhookModal };
export type { EditWebhookModalProps };
