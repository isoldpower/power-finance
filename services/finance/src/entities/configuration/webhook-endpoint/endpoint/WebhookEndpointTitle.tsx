import { RowTitle } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface WebhookEndpointTitleProps {
	children: ReactNode;
}

const WebhookEndpointTitle: FC<WebhookEndpointTitleProps> = ({ children }) => (
	<RowTitle as="h4" size="14.5" className="flex min-w-0 items-center gap-2">
		{children}
	</RowTitle>
);

WebhookEndpointTitle.displayName = 'WebhookEndpointTitle';

export { WebhookEndpointTitle };
export type { WebhookEndpointTitleProps };
