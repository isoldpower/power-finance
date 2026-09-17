import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface WebhookEndpointHeadProps {
	controls?: ReactNode;
	children: ReactNode;
}

const WebhookEndpointHead: FC<WebhookEndpointHeadProps> = ({ controls, children }) => (
	<div className={cn("flex items-start justify-between gap-3 p-4")}>
		<div className="flex min-w-0 flex-col gap-1.5">
			{children}
		</div>
		{controls === undefined ? null : (
			<div className="flex flex-none items-center gap-1.5">
				{controls}
			</div>
		)}
	</div>
);

WebhookEndpointHead.displayName = 'WebhookEndpointHead';

export { WebhookEndpointHead };
export type { WebhookEndpointHeadProps };
