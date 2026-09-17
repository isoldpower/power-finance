import { cn } from "@internal/ui-library";
import { pendingClass } from "@shared/pure-components/feedback";
import { WebhookEndpointHead } from "./endpoint/WebhookEndpointHead.tsx";
import { WebhookEndpointPanel } from "./endpoint/WebhookEndpointPanel.tsx";
import { WebhookEndpointTitle } from "./endpoint/WebhookEndpointTitle.tsx";
import { WebhookEndpointUrl } from "./endpoint/WebhookEndpointUrl.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WebhookEndpointHeadProps } from "./endpoint/WebhookEndpointHead.tsx";
import type { WebhookEndpointPanelProps } from "./endpoint/WebhookEndpointPanel.tsx";
import type { WebhookEndpointTitleProps } from "./endpoint/WebhookEndpointTitle.tsx";
import type { WebhookEndpointUrlProps } from "./endpoint/WebhookEndpointUrl.tsx";


type WebhookEndpointCardProps = PropsWithChildren<{
	pending?: boolean;
}>;
type WebhookEndpointCardObject = FC<WebhookEndpointCardProps> & {
	Head: FC<WebhookEndpointHeadProps>;
	Panel: FC<WebhookEndpointPanelProps>;
	Title: FC<WebhookEndpointTitleProps>;
	Url: FC<WebhookEndpointUrlProps>;
};

const WebhookEndpointCard: WebhookEndpointCardObject = ({ pending, children }) => (
	<article
		className={cn(
			"overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface",
			pendingClass(pending)
		)}
	>
		{children}
	</article>
);

WebhookEndpointCard.Head = WebhookEndpointHead;
WebhookEndpointCard.Panel = WebhookEndpointPanel;
WebhookEndpointCard.Title = WebhookEndpointTitle;
WebhookEndpointCard.Url = WebhookEndpointUrl;
WebhookEndpointCard.displayName = 'WebhookEndpointCard';

export { WebhookEndpointCard };
export type { WebhookEndpointCardProps };
