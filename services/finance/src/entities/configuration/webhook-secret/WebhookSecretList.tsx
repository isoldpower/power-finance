import { WebhookSecretNotice } from "./secret/WebhookSecretNotice.tsx";
import { WebhookSecretRow } from "./secret/WebhookSecretRow.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WebhookSecretNoticeProps } from "./secret/WebhookSecretNotice.tsx";
import type { WebhookSecretRowProps } from "./secret/WebhookSecretRow.tsx";


type WebhookSecretListProps = PropsWithChildren;
type WebhookSecretListObject = FC<WebhookSecretListProps> & {
	Notice: FC<WebhookSecretNoticeProps>;
	Row: FC<WebhookSecretRowProps>;
};

const WebhookSecretList: WebhookSecretListObject = ({ children }) => (
	<div className="flex flex-col gap-3">
		{children}
	</div>
);

WebhookSecretList.Notice = WebhookSecretNotice;
WebhookSecretList.Row = WebhookSecretRow;
WebhookSecretList.displayName = 'WebhookSecretList';

export { WebhookSecretList };
export type { WebhookSecretListProps };
