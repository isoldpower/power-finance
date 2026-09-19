import { useCallback, useMemo } from "react";
import { webhookEventGroups } from "@entity/configuration";

import {
	useWebhookEventTypes,
	useWebhookSubscriptionMethods,
	useWebhookSubscriptions,
} from "../data-presenters";

import type { WebhookEventGroupView, WebhookSubscription } from "@entity/configuration";


interface UseWebhookEventsEditorReturn {
	groups: WebhookEventGroupView[];
	isPending: boolean;
	isError: boolean;
	isToggling: boolean;
	isSubscribed: (event: string) => boolean;
	isEventPending: (event: string) => boolean;
	onToggle: (event: string, next: boolean) => void;
}

function useWebhookEventsEditor(webhookId: string): UseWebhookEventsEditorReturn {
	const { eventTypes, isPending: typesPending, isError } = useWebhookEventTypes();
	const { subscriptions, isPending: subscriptionsPending } = useWebhookSubscriptions(webhookId);
	const { subscribe, unsubscribe } = useWebhookSubscriptionMethods(webhookId);

	const groups = useMemo(() => {
		return webhookEventGroups(eventTypes);
	}, [eventTypes]);
	const subscribed = useMemo(() => {
		return new Map<string, WebhookSubscription>(
			subscriptions.map((subscription) => [
				subscription.event,
				subscription
			])
		);
	}, [subscriptions]);

	const isSubscribed = useCallback((event: string): boolean => {
		return subscribed.has(event);
	}, [subscribed]);

	const isEventPending = useCallback((event: string): boolean => {
		return subscribed.get(event)?.pending ?? false;
	}, [subscribed]);

	const onToggle = useCallback((event: string, next: boolean): void => {
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

	return {
		groups,
		isPending: typesPending || subscriptionsPending,
		isError,
		isToggling: subscribe.isPending || unsubscribe.isPending,
		isSubscribed,
		isEventPending,
		onToggle,
	};
}

export { useWebhookEventsEditor };
export type { UseWebhookEventsEditorReturn };
