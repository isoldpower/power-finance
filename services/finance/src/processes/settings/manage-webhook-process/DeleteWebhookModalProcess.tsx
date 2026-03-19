import {
	Dialog,
	DialogContent, 
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Delete Webhook
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete the following Webhook?
					</DialogDescription>
				</DialogHeader>
				<DeleteWebhookForm 
					targetWebhook={targetWebhook} 
					closeModal={closeModal}
				/>
			</DialogContent>
		</Dialog>
	);
}

export { DeleteWebhookModalProcess };
export type { DeleteWebhookModalProps };
