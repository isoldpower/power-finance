import { WebhookEventList } from "./group/WebhookEventList.tsx";
import { WebhookEventSubject } from "./group/WebhookEventSubject.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WebhookEventListProps } from "./group/WebhookEventList.tsx";
import type { WebhookEventSubjectProps } from "./group/WebhookEventSubject.tsx";


type WebhookEventGroupProps = PropsWithChildren;
type WebhookEventGroupObject = FC<WebhookEventGroupProps> & {
	List: FC<WebhookEventListProps>;
	Subject: FC<WebhookEventSubjectProps>;
};

const WebhookEventGroup: WebhookEventGroupObject = ({ children }) => (
	<section className="mb-3 last:mb-0">
		{children}
	</section>
);

WebhookEventGroup.List = WebhookEventList;
WebhookEventGroup.Subject = WebhookEventSubject;
WebhookEventGroup.displayName = 'WebhookEventGroup';

export { WebhookEventGroup };
export type { WebhookEventGroupProps };
