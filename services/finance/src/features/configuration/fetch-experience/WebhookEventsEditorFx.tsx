import { SkeletonText } from "@shared/pure-components/feedback";
import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WebhookEventsEditorFxProps = PropsWithChildren<{
	isPending: boolean;
	isError: boolean;
}>;

const EventsSkeleton: FC = () => (
	<div className="flex flex-col gap-2 py-1">
		{Array.from({ length: 4 }).map((_, key) => (
			<SkeletonText key={`Skeleton row ${key.toString()}`} size="12" width="w-48" />
		))}
	</div>
);

EventsSkeleton.displayName = 'EventsSkeleton';

const EventsUnavailable: FC = () => (
	<Caption size="11.5">
		Event types couldn't be loaded.
	</Caption>
);

EventsUnavailable.displayName = 'EventsUnavailable';

const WebhookEventsEditorFx: FC<WebhookEventsEditorFxProps> = ({
	isPending,
	isError,
	children
}) => {
	if (isError) {
		return (
			<EventsUnavailable/>
		)
	} else if (isPending) {
		return (
			<EventsSkeleton/>
		);
	}

	return children;
}

export { WebhookEventsEditorFx };
export type { WebhookEventsEditorFxProps };
