import type { FC, PropsWithChildren } from "react";


type WebhookEventListProps = PropsWithChildren;

const WebhookEventList: FC<WebhookEventListProps> = ({ children }) => (
	<div className="flex flex-col">
		{children}
	</div>
);

WebhookEventList.displayName = 'WebhookEventList';

export { WebhookEventList };
export type { WebhookEventListProps };
