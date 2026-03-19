import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Edit Webhook
					</DialogTitle>
				</DialogHeader>
				<EditWebhookForm
					targetWebhook={targetWebhook}
					closeModal={closeModal}
				/>
			</DialogContent>
		</Dialog>
	);
}

export { EditWebhookModalProcess };
export type { EditWebhookModalProps };
