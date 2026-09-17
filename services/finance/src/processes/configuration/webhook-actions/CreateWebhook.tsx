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

import { CREATE_HINT, CREATED_HINT } from "./config.ts";

import type { WebhookEndpointSecret } from "@entity/configuration";
import type { FC } from "react";


const CreateWebhook: FC = () => {
	const { open, setOpen, onOpen, onClose } = useDisclosure();
	const [created, setCreated] = useState<WebhookEndpointSecret | null>(null);

	const handleOpenChange = useCallback((isNowOpen: boolean) => {
		setOpen(isNowOpen);

		if (!isNowOpen) {
			setCreated(null);
		}
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
							{created === null ? CREATE_HINT : CREATED_HINT}
						</UiDialogDescription>
					</UiDialogHeader>
					{created === null ? (
						<NewWebhookForm onWebhookCreated={setCreated} onCancel={onClose} />
					) : (
						<>
							<WebhookSecretPanel webhook={created} />
							<UiDialogFooter>
								<FinanceButton onClick={onClose}>
									Done
								</FinanceButton>
							</UiDialogFooter>
						</>
					)}
				</ModalContent>
			</UiDialog>
		</>
	);
};

CreateWebhook.displayName = 'CreateWebhook';

export { CreateWebhook };
