import { useCallback, useMemo } from "react";
import { UiSwitch } from "@internal/ui-library";
import { WebhookEvents, webhookEventGroups } from "@entity/configuration";
import {
	useWebhookEventTypes,
	useWebhookSubscriptions,
	useWebhookSubscriptionMethods,
} from "@feature/configuration";
import { SkeletonText } from "@shared/pure-components/feedback";
import { Caption } from "@shared/pure-components/typography";

import { EVENTS_HINT, EVENTS_UNAVAILABLE, EVENT_SKELETON_ROWS } from "./config.ts";

import type { FC } from "react";
import type { WebhookSubscription } from "@entity/configuration";


interface WebhookEventsEditorProps {
	webhookId: string;
}

const WebhookEventsEditor: FC<WebhookEventsEditorProps> = ({ webhookId }) => {
	const { eventTypes, isPending: typesPending, isError: typesError } = useWebhookEventTypes();
	const { subscriptions, isPending: subscriptionsPending } = useWebhookSubscriptions(webhookId);
	const { subscribe, unsubscribe } = useWebhookSubscriptionMethods(webhookId);

	const groups = useMemo(() => webhookEventGroups(eventTypes), [eventTypes]);
	const subscribed = useMemo(() => {
		return new Map<string, WebhookSubscription>(
			subscriptions.map((subscription) => [subscription.event, subscription])
		);
	}, [subscriptions]);

	const handleToggle = useCallback((event: string, next: boolean): void => {
		const current = subscribed.get(event);

		if (next) {
			if (current === undefined) {
				subscribe.mutate(event);
			}

			return;
		}

		if (current !== undefined) {
			unsubscribe.mutate(current.id);
		}
	}, [subscribe, subscribed, unsubscribe]);

	if (typesError) {
		return (
			<Caption size="11.5">
				{EVENTS_UNAVAILABLE}
			</Caption>
		);
	}

	if (typesPending || subscriptionsPending) {
		return (
			<div className="flex flex-col gap-2 py-1">
				{EVENT_SKELETON_ROWS.map((row) => (
					<SkeletonText key={row} size="12" width="w-48" />
				))}
			</div>
		);
	}

	return (
		<WebhookEvents hint={EVENTS_HINT}>
			{groups.map((group) => (
				<WebhookEvents.Group key={group.subject} subject={group.subject}>
					{group.events.map((eventType) => {
						const subscription = subscribed.get(eventType.event);

						return (
							<WebhookEvents.Row
								key={eventType.event}
								event={eventType.event}
								description={eventType.description}
								pending={subscription?.pending}
							>
								<UiSwitch
									checked={subscription !== undefined}
									disabled={subscribe.isPending || unsubscribe.isPending}
									aria-label={eventType.event}
									onCheckedChange={(next) => { handleToggle(eventType.event, next); }}
								/>
							</WebhookEvents.Row>
						);
					})}
				</WebhookEvents.Group>
			))}
		</WebhookEvents>
	);
};

WebhookEventsEditor.displayName = 'WebhookEventsEditor';

export { WebhookEventsEditor };
export type { WebhookEventsEditorProps };
