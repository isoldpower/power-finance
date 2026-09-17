import { MetaText } from "@shared/pure-components/typography";

import type { FC } from "react";


interface WebhookEndpointUrlProps {
	url: string;
}

const WebhookEndpointUrl: FC<WebhookEndpointUrlProps> = ({ url }) => (
	<MetaText as="span" size="11" tone="subtle" className="block truncate">
		{url}
	</MetaText>
);

WebhookEndpointUrl.displayName = 'WebhookEndpointUrl';

export { WebhookEndpointUrl };
export type { WebhookEndpointUrlProps };
