import {
	UiDialog,
	UiDialogContent,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogTrigger,
} from "@internal/ui-library";
import type { FC, PropsWithChildren } from "react";

import type { WebhookEndpoint } from "@entity/configuration";
import { EditWebhookForm } from "@widget/configuration";
import { useDisclosure } from "@shared/overlays";


type EditWebhookModalProps = PropsWithChildren<{
	targetWebhook: WebhookEndpoint
}>;

const EditWebhookModalProcess: FC<EditWebhookModalProps> = ({
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

export { EditWebhookModalProcess };
export type { EditWebhookModalProps };
