import { FinanceBadge, FinanceIconButton, Icons } from "@internal/ui-library";
import { WebhookEndpointCard } from "@entity/configuration";
import { DeleteWebhookModal, EditWebhookModal, WebhookEventsEditor } from "@widget/configuration";
import { useDisclosure } from "@shared/overlays";
import { ChevronDownIcon } from "@shared/pure-components/icons";
import { cn } from "@internal/ui-library";

import type { FC } from "react";
import type { WebhookEndpoint } from "@entity/configuration";


interface WebhookEndpointEntryProps {
	webhook: WebhookEndpoint;
}

const WebhookEndpointEntry: FC<WebhookEndpointEntryProps> = ({
	webhook,
}) => {
	const { open, onToggle } = useDisclosure();

	return (
		<WebhookEndpointCard pending={webhook.pending}>
			<WebhookEndpointCard.Head
				controls={(
					<>
						<FinanceIconButton
							aria-label={open ? 'Hide events' : 'Show events'}
							aria-expanded={open}
							onClick={onToggle}
						>
							<ChevronDownIcon
								size={14}
								className={cn(
									"transition-transform",
									open && "rotate-180"
								)}
							/>
						</FinanceIconButton>
						<EditWebhookModal targetWebhook={webhook}>
							<FinanceIconButton aria-label={`Edit ${webhook.title}`}>
								<Icons.Pencil size={14} />
							</FinanceIconButton>
						</EditWebhookModal>
						<DeleteWebhookModal targetWebhook={webhook}>
							<FinanceIconButton
								aria-label={`Delete ${webhook.title}`}
								className='border-[var(--neg-soft)] text-neg hover:bg-neg-soft hover:text-neg'
							>
								<Icons.Trash2 size={14} />
							</FinanceIconButton>
						</DeleteWebhookModal>
					</>
				)}
			>
				<WebhookEndpointCard.Title>
					<span className="truncate">
						{webhook.title}
					</span>
					<FinanceBadge size="sm" tone={webhook.enabled ? 'pos' : 'neutral'}>
						{webhook.enabled ? 'Active' : 'Paused'}
					</FinanceBadge>
				</WebhookEndpointCard.Title>
				<WebhookEndpointCard.Url url={webhook.url} />
			</WebhookEndpointCard.Head>
			{open ? (
				<WebhookEndpointCard.Panel>
					<WebhookEventsEditor webhookId={webhook.id} />
				</WebhookEndpointCard.Panel>
			) : null}
		</WebhookEndpointCard>
	);
};

WebhookEndpointEntry.displayName = 'WebhookEndpointEntry';

export { WebhookEndpointEntry };
export type { WebhookEndpointEntryProps };
