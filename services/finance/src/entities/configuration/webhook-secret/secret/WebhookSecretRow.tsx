import { UiLabel } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface WebhookSecretRowProps {
	label: string;
	children: ReactNode;
}

const WebhookSecretRow: FC<WebhookSecretRowProps> = ({ label, children }) => (
	<div className="flex flex-col gap-1.5">
		<UiLabel>
			{label}
		</UiLabel>
		{children}
	</div>
);

WebhookSecretRow.displayName = 'WebhookSecretRow';

export { WebhookSecretRow };
export type { WebhookSecretRowProps };
