import { useCallback, useState } from "react";
import {
	FinanceButton,
	Icons,
	UiDialog,
	UiDialogDescription,
	UiDialogFooter,
	UiDialogHeader,
	UiDialogTitle,
} from "@internal/ui-library";
import { NewWebhookForm, WebhookSecretPanel } from "@widget/configuration";
import { ModalContent, useDisclosure } from "@shared/overlays";
import { ShowOn } from "@shared/visibility";

import type { WebhookEndpointSecret } from "@entity/configuration";
import type { FC } from "react";


const CreateWebhook: FC = () => {
	const { open, setOpen, onOpen, onClose } = useDisclosure();
	const [created, setCreated] = useState<WebhookEndpointSecret | null>(null);

	const handleOpenChange = useCallback((isNowOpen: boolean) => {
		setOpen(isNowOpen);

		if (!isNowOpen) setCreated(null);
	}, [setOpen]);

	return (
		<>
			<FinanceButton size="sm" onClick={onOpen}>
				<Icons.Plus size={14} />
				New endpoint
			</FinanceButton>
			<UiDialog open={open} onOpenChange={handleOpenChange}>
				<ModalContent>
					<UiDialogHeader>
						<UiDialogTitle>
							{created === null ? 'New webhook endpoint' : 'Endpoint created'}
						</UiDialogTitle>
						<UiDialogDescription>
							{created === null 
								? 'Name the endpoint and give the URL that should receive the events.' 
								: 'Pick the events it should receive from the endpoint list.'}
						</UiDialogDescription>
					</UiDialogHeader>
					<ShowOn condition={created === null}>
						<NewWebhookForm 
							onWebhookCreated={setCreated}
							onCancel={onClose} 
						/>
					</ShowOn>
					<ShowOn<WebhookEndpointSecret | null> condition={created}>
						{(created) => (
							<>
								<WebhookSecretPanel webhook={created} />
								<UiDialogFooter>
									<FinanceButton onClick={onClose}>
										Done
									</FinanceButton>
								</UiDialogFooter>
							</>
						)}
					</ShowOn>
				</ModalContent>
			</UiDialog>
		</>
	);
};

CreateWebhook.displayName = 'CreateWebhook';

export { CreateWebhook };
