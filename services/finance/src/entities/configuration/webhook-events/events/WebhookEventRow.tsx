import { cn } from "@internal/ui-library";
import { pendingClass } from "@shared/pure-components/feedback";
import { Caption, MetaText } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface WebhookEventRowProps {
	event: string;
	description: string;
	pending?: boolean;
	children: ReactNode;
}

const WebhookEventRow: FC<WebhookEventRowProps> = ({
	event,
	description,
	pending,
	children,
}) => (
	<div
		className={cn(
			"flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-b-0",
			pendingClass(pending)
		)}
	>
		<div className="flex min-w-0 flex-col gap-0.5">
			<MetaText as="span" size="12" tone="default">
				{event}
			</MetaText>
			<Caption size="11">
				{description}
			</Caption>
		</div>
		<div className="flex-none">
			{children}
		</div>
	</div>
);

WebhookEventRow.displayName = 'WebhookEventRow';

export { WebhookEventRow };
export type { WebhookEventRowProps };
