import { Overline } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WebhookEventSubjectProps = PropsWithChildren;

const WebhookEventSubject: FC<WebhookEventSubjectProps> = ({ children }) => (
	<Overline as="span" size="10" tracking="normal" className="mb-1 block">
		{children}
	</Overline>
);

WebhookEventSubject.displayName = 'WebhookEventSubject';

export { WebhookEventSubject };
export type { WebhookEventSubjectProps };
