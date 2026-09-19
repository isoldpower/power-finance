import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WebhookEventDescriptionProps = PropsWithChildren;

const WebhookEventDescription: FC<WebhookEventDescriptionProps> = ({ children }) => (
	<Caption size="11">
		{children}
	</Caption>
);

WebhookEventDescription.displayName = 'WebhookEventDescription';

export { WebhookEventDescription };
export type { WebhookEventDescriptionProps };
