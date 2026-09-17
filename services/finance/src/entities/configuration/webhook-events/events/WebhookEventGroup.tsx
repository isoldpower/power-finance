import { Overline } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface WebhookEventGroupProps {
	subject: string;
	children: ReactNode;
}

const WebhookEventGroup: FC<WebhookEventGroupProps> = ({ subject, children }) => (
	<section className="mb-3 last:mb-0">
		<Overline as="span" size="10" tracking="normal" className="mb-1 block">
			{subject}
		</Overline>
		<div className="flex flex-col">
			{children}
		</div>
	</section>
);

WebhookEventGroup.displayName = 'WebhookEventGroup';

export { WebhookEventGroup };
export type { WebhookEventGroupProps };
