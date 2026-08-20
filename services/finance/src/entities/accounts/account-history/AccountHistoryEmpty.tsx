import { cn } from "@internal/ui-library";
import { AccountHistoryEmptyIcon } from "./empty-state/AccountHistoryEmptyIcon.tsx";
import { AccountHistoryEmptyMessage } from "./empty-state/AccountHistoryEmptyMessage.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AccountHistoryEmptyIconProps } from "./empty-state/AccountHistoryEmptyIcon.tsx";
import type { AccountHistoryEmptyMessageProps } from "./empty-state/AccountHistoryEmptyMessage.tsx";


type AccountHistoryEmptyProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AccountHistoryEmptyObject = FC<AccountHistoryEmptyProps> & {
	Icon: FC<AccountHistoryEmptyIconProps>;
	Message: FC<AccountHistoryEmptyMessageProps>;
}

const AccountHistoryEmpty: AccountHistoryEmptyObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex flex-col items-center justify-center gap-1.5 px-5 py-11 text-center"
		)}
		{...props}
	>
		{children}
	</div>
);

AccountHistoryEmpty.Icon = AccountHistoryEmptyIcon;
AccountHistoryEmpty.Message = AccountHistoryEmptyMessage;
AccountHistoryEmpty.displayName = 'AccountHistoryEmpty';

export { AccountHistoryEmpty };
export type { AccountHistoryEmptyProps };
