import { WebhookEventsHint } from "./events/WebhookEventsHint.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WebhookEventsHintProps } from "./events/WebhookEventsHint.tsx";


type WebhookEventsProps = PropsWithChildren;
type WebhookEventsObject = FC<WebhookEventsProps> & {
	Hint: FC<WebhookEventsHintProps>;
};

const WebhookEvents: WebhookEventsObject = ({ children }) => (
	<div className="flex flex-col">
		{children}
	</div>
);

WebhookEvents.Hint = WebhookEventsHint;
WebhookEvents.displayName = 'WebhookEvents';

export { WebhookEvents };
export type { WebhookEventsProps };
