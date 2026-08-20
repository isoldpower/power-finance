import { Caption } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AccountHistoryEmptyMessageProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLElement>, 'className'>>;

const AccountHistoryEmptyMessage: FC<AccountHistoryEmptyMessageProps> = ({
	children,
	...props
}) => (
	<Caption
		size="xs"
		leading="relaxed"
		className="max-w-[300px]"
		{...props}
	>
		{children}
	</Caption>
);

AccountHistoryEmptyMessage.displayName = 'AccountHistoryEmptyMessage';

export { AccountHistoryEmptyMessage };
export type { AccountHistoryEmptyMessageProps };
