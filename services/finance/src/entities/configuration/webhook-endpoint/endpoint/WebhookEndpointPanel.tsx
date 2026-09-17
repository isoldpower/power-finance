import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface WebhookEndpointPanelProps {
	children: ReactNode;
}

const WebhookEndpointPanel: FC<WebhookEndpointPanelProps> = ({ children }) => (
	<div className={cn("border-t border-border bg-secondary px-4 py-3")}>
		{children}
	</div>
);

WebhookEndpointPanel.displayName = 'WebhookEndpointPanel';

export { WebhookEndpointPanel };
export type { WebhookEndpointPanelProps };
