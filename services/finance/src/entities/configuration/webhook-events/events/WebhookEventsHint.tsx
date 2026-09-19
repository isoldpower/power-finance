import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WebhookEventsHintProps = PropsWithChildren;

const WebhookEventsHint: FC<WebhookEventsHintProps> = ({ children }) => (
	<Caption size="11" className="mb-2">
		{children}
	</Caption>
);

WebhookEventsHint.displayName = 'WebhookEventsHint';

export { WebhookEventsHint };
export type { WebhookEventsHintProps };
