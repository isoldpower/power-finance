import { cn } from "@internal/ui-library";
import { AccountRowBadge } from "./history-row/AccountRowBadge.tsx";
import { AccountRowIcon } from "./history-row/AccountRowIcon.tsx";
import { AccountRowValue } from "./history-row/AccountRowValue.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AccountRowBadgeProps } from "./history-row/AccountRowBadge.tsx";
import type { AccountRowIconProps } from "./history-row/AccountRowIcon.tsx";
import type { AccountRowValueProps } from "./history-row/AccountRowValue.tsx";


type AccountHistoryRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AccountHistoryRowObject = FC<AccountHistoryRowProps> & {
	Badge: FC<AccountRowBadgeProps>;
	Icon: FC<AccountRowIconProps>;
	Value: FC<AccountRowValueProps>;
}

const AccountHistoryRow: AccountHistoryRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-3",
			"border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</div>
);

AccountHistoryRow.Badge = AccountRowBadge;
AccountHistoryRow.Icon = AccountRowIcon;
AccountHistoryRow.Value = AccountRowValue;
AccountHistoryRow.displayName = 'AccountHistoryRow';

export { AccountHistoryRow };
export type { AccountHistoryRowProps };
