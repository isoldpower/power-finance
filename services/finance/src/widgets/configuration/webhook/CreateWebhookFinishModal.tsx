import { InputField } from "@shared/forms";
import {
	UiCardDescription,
	UiCardTitle,
	UiDialog,
	UiDialogContent,
	UiDialogHeader,
	UiLabel,
	PasswordInput
} from "@internal/ui-library";
import {FC} from "react";
import type { WebhookEndpointSecret } from "@entity/configuration";

interface CreateWebhookFinishModalProps {
	open: boolean;
	onOpenChange: (value: boolean) => void;
	webhook?: WebhookEndpointSecret | null;
}

const CreateWebhookFinishModal: FC<CreateWebhookFinishModalProps> = ({
	open,
	onOpenChange,
	webhook
}) => {
	return (
		<UiDialog open={open} onOpenChange={onOpenChange}>
			<UiDialogContent>
				<UiDialogHeader>
					<UiCardTitle>Webhook Successfully Created</UiCardTitle>
					<UiCardDescription>
						Secret key will be used to sign payloads. Write it down as you will not be able
						to access it in the future and only rotate it.
					</UiCardDescription>
				</UiDialogHeader>
				<div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
					<div className="grid grid-cols-subgrid col-span-2">
						<UiLabel>Webhook ID</UiLabel>
						<InputField disabled value={webhook?.id} />
					</div>
					<div className="grid grid-cols-subgrid col-span-2">
						<UiLabel>Title</UiLabel>
						<InputField disabled value={webhook?.title} />
					</div>
					<div className="grid grid-cols-subgrid col-span-2">
						<UiLabel>URL</UiLabel>
						<InputField disabled value={webhook?.url} />
					</div>
					<div className="grid grid-cols-subgrid col-span-2">
						<UiLabel>Secret</UiLabel>
						<PasswordInput
							enableButton={true}
							disabled
							value={webhook?.secret}
						/>
					</div>
				</div>
			</UiDialogContent>
		</UiDialog>
	);
}

export { CreateWebhookFinishModal };