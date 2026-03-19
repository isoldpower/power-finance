import { InputField } from "@shared/components";
import {
	CardDescription,
	CardTitle,
	Dialog,
	DialogContent,
	DialogHeader,
	Label,
	PasswordInput
} from "@internal/ui-library";
import {FC} from "react";
import {WebhookEndpoint} from "@entity/settings";

interface CreateWebhookFinishModalProps {
	open: boolean;
	onOpenChange: (value: boolean) => void;
	webhook?: WebhookEndpoint | null;
}

const CreateWebhookFinishModal: FC<CreateWebhookFinishModalProps> = ({
	open,
	onOpenChange,
	webhook
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<CardTitle>Webhook Successfully Created</CardTitle>
					<CardDescription>
						Secret key will be used to sign payloads. Write it down as you will not be able
						to access it in the future and only rotate it.
					</CardDescription>
				</DialogHeader>
				<div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
					<div className="grid grid-cols-subgrid col-span-2">
						<Label>Webhook ID</Label>
						<InputField disabled value={webhook?.id} />
					</div>
					<div className="grid grid-cols-subgrid col-span-2">
						<Label>Title</Label>
						<InputField disabled value={webhook?.title} />
					</div>
					<div className="grid grid-cols-subgrid col-span-2">
						<Label>URL</Label>
						<InputField disabled value={webhook?.url} />
					</div>
					<div className="grid grid-cols-subgrid col-span-2">
						<Label>Secret</Label>
						<PasswordInput
							enableButton={true}
							disabled
							value={webhook?.secret}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export { CreateWebhookFinishModal };