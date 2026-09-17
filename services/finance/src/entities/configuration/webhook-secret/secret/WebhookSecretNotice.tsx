import { cn } from "@internal/ui-library";
import { AlertIcon } from "@shared/pure-components/icons";
import { BodyText } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface WebhookSecretNoticeProps {
	children: ReactNode;
}

const WebhookSecretNotice: FC<WebhookSecretNoticeProps> = ({ children }) => (
	<div
		className={cn(
			"flex items-start gap-2 rounded-[var(--radius-md)] px-3 py-2",
			"border border-warn/40 bg-warn-soft"
		)}
	>
		<AlertIcon size={14} className="mt-0.5 flex-none text-warn" />
		<BodyText as="span" size="12.5" leading="relaxed">
			{children}
		</BodyText>
	</div>
);

WebhookSecretNotice.displayName = 'WebhookSecretNotice';

export { WebhookSecretNotice };
export type { WebhookSecretNoticeProps };
