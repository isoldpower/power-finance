import { UiSwitch } from "@internal/ui-library";
import { WebhookEventGroup, WebhookEventRow, WebhookEvents } from "@entity/configuration";
import { useWebhookEventsEditor, WebhookEventsEditorFx } from "@feature/configuration";

import type { FC } from "react";


interface WebhookEventsEditorProps {
	webhookId: string;
}

const WebhookEventsEditor: FC<WebhookEventsEditorProps> = ({ webhookId }) => {
	const {
		groups,
		isPending,
		isError,
		isToggling,
		isSubscribed,
		isEventPending,
		onToggle,
	} = useWebhookEventsEditor(webhookId);

	return (
		<WebhookEventsEditorFx isPending={isPending} isError={isError}>
			<WebhookEvents>
				<WebhookEvents.Hint>
					Pick the events this endpoint should receive.
				</WebhookEvents.Hint>
				{groups.map((group) => (
					<WebhookEventGroup key={group.subject}>
						<WebhookEventGroup.Subject>
							{group.subject}
						</WebhookEventGroup.Subject>
						<WebhookEventGroup.List>
							{group.events.map((eventType) => (
								<WebhookEventRow key={eventType.event} pending={isEventPending(eventType.event)}>
									<WebhookEventRow.Info>
										<WebhookEventRow.Name>
											{eventType.event}
										</WebhookEventRow.Name>
										<WebhookEventRow.Description>
											{eventType.description}
										</WebhookEventRow.Description>
									</WebhookEventRow.Info>
									<WebhookEventRow.Control>
										<UiSwitch
											checked={isSubscribed(eventType.event)}
											disabled={isToggling}
											aria-label={eventType.event}
											onCheckedChange={(next) => { 
												onToggle(eventType.event, next); 
											}}
										/>
									</WebhookEventRow.Control>
								</WebhookEventRow>
							))}
						</WebhookEventGroup.List>
					</WebhookEventGroup>
				))}
			</WebhookEvents>
		</WebhookEventsEditorFx>
	);
};

WebhookEventsEditor.displayName = 'WebhookEventsEditor';

export { WebhookEventsEditor };
export type { WebhookEventsEditorProps };
