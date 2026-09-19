import type { FC, PropsWithChildren } from "react";


type WebhookEventInfoProps = PropsWithChildren;

const WebhookEventInfo: FC<WebhookEventInfoProps> = ({ children }) => (
	<div className="flex min-w-0 flex-col gap-0.5">
		{children}
	</div>
);

WebhookEventInfo.displayName = 'WebhookEventInfo';

export { WebhookEventInfo };
export type { WebhookEventInfoProps };
