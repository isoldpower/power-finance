import { UiCardDescription, UiCardTitle } from "@internal/ui-library";

import type { FC, ReactNode } from 'react';
import type { WebhookEndpoint } from "@entity/configuration";


interface WebhookWithControlsProps {
	webhook: WebhookEndpoint;
	children: ReactNode;
}

const WebhookWithControls: FC<WebhookWithControlsProps> = ({
	webhook,
	children
}) => {
	return (
		<div className="p-2">
			<div className="flex justify-between items-center">
				<div className="flex flex-col gap-2">
					<UiCardTitle className="mb-0! pb-0!">
						{webhook.title}
					</UiCardTitle>
					<UiCardDescription className="mt-0! pt-0!">
						{webhook.url}
					</UiCardDescription>
				</div>
				<div className="flex gap-2 items-center">
					{children}
				</div>
			</div>
		</div>
	);
};

export { WebhookWithControls };
export type { WebhookWithControlsProps };
