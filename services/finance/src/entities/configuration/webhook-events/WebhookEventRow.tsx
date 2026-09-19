import { cn } from "@internal/ui-library";
import { pendingClass } from "@shared/pure-components/feedback";
import { WebhookEventControl } from "./row/WebhookEventControl.tsx";
import { WebhookEventDescription } from "./row/WebhookEventDescription.tsx";
import { WebhookEventInfo } from "./row/WebhookEventInfo.tsx";
import { WebhookEventName } from "./row/WebhookEventName.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WebhookEventControlProps } from "./row/WebhookEventControl.tsx";
import type { WebhookEventDescriptionProps } from "./row/WebhookEventDescription.tsx";
import type { WebhookEventInfoProps } from "./row/WebhookEventInfo.tsx";
import type { WebhookEventNameProps } from "./row/WebhookEventName.tsx";


type WebhookEventRowProps = PropsWithChildren<{
	pending?: boolean;
}>;
type WebhookEventRowObject = FC<WebhookEventRowProps> & {
	Control: FC<WebhookEventControlProps>;
	Description: FC<WebhookEventDescriptionProps>;
	Info: FC<WebhookEventInfoProps>;
	Name: FC<WebhookEventNameProps>;
};

const WebhookEventRow: WebhookEventRowObject = ({ pending, children }) => (
	<div
		className={cn(
			"flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-b-0",
			pendingClass(pending)
		)}
	>
		{children}
	</div>
);

WebhookEventRow.Control = WebhookEventControl;
WebhookEventRow.Description = WebhookEventDescription;
WebhookEventRow.Info = WebhookEventInfo;
WebhookEventRow.Name = WebhookEventName;
WebhookEventRow.displayName = 'WebhookEventRow';

export { WebhookEventRow };
export type { WebhookEventRowProps };
