import { Caption } from "@shared/pure-components/typography";
import { WebhookEventGroup } from "./events/WebhookEventGroup.tsx";
import { WebhookEventRow } from "./events/WebhookEventRow.tsx";

import type { FC, PropsWithChildren, ReactNode } from "react";
import type { WebhookEventGroupProps } from "./events/WebhookEventGroup.tsx";
import type { WebhookEventRowProps } from "./events/WebhookEventRow.tsx";


type WebhookEventsProps = PropsWithChildren<{
	hint?: ReactNode;
}>;
type WebhookEventsObject = FC<WebhookEventsProps> & {
	Group: FC<WebhookEventGroupProps>;
	Row: FC<WebhookEventRowProps>;
};

const WebhookEvents: WebhookEventsObject = ({ hint, children }) => (
	<div className="flex flex-col">
		{hint === undefined ? null : (
			<Caption size="11" className="mb-2">
				{hint}
			</Caption>
		)}
		{children}
	</div>
);

WebhookEvents.Group = WebhookEventGroup;
WebhookEvents.Row = WebhookEventRow;
WebhookEvents.displayName = 'WebhookEvents';

export { WebhookEvents };
export type { WebhookEventsProps };
