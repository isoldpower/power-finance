import {
	UiDialog,
	UiDialogContent,
	UiDialogHeader,
	UiDialogTitle,
	UiDialogTrigger,
} from "@internal/ui-library";
import { useCallback, useState } from "react";
import type { FC, PropsWithChildren } from "react";

import type { WebhookEndpoint } from "@entity/settings";
import { EditWebhookForm } from "@widget/settings";


type EditWebhookModalProps = PropsWithChildren<{
	targetWebhook: WebhookEndpoint
}>;

const EditWebhookModalProcess: FC<EditWebhookModalProps> = ({
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
						Edit Webhook
					</UiDialogTitle>
				</UiDialogHeader>
				<EditWebhookForm
					targetWebhook={targetWebhook}
					closeModal={closeModal}
				/>
			</UiDialogContent>
		</UiDialog>
	);
}

export { EditWebhookModalProcess };
export type { EditWebhookModalProps };
