import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WebhookEventNameProps = PropsWithChildren;

const WebhookEventName: FC<WebhookEventNameProps> = ({ children }) => (
	<MetaText as="span" size="12" tone="default">
		{children}
	</MetaText>
);

WebhookEventName.displayName = 'WebhookEventName';

export { WebhookEventName };
export type { WebhookEventNameProps };
