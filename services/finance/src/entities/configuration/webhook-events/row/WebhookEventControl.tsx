import type { FC, PropsWithChildren } from "react";


type WebhookEventControlProps = PropsWithChildren;

const WebhookEventControl: FC<WebhookEventControlProps> = ({ children }) => (
	<div className="flex-none">
		{children}
	</div>
);

WebhookEventControl.displayName = 'WebhookEventControl';

export { WebhookEventControl };
export type { WebhookEventControlProps };
