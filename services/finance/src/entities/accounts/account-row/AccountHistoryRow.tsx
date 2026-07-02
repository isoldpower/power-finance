import type { FC, PropsWithChildren}  from "react";

import { AccountRowBadge } from "./AccountRowBadge.tsx";
import { AccountRowDate } from "./AccountRowDate.tsx";
import { AccountRowDescription } from "./AccountRowDescription.tsx";
import { AccountRowIcon } from "./AccountRowIcon.tsx";
import { AccountRowValue } from "./AccountRowValue.tsx";
import type { AccountRowBadgeProps } from "./AccountRowBadge.tsx";
import type { AccountRowDateProps } from "./AccountRowDate.tsx";
import type { AccountRowDescriptionProps } from "./AccountRowDescription.tsx";
import type { AccountRowIconProps } from "./AccountRowIcon.tsx";
import type { AccountRowValueProps } from "./AccountRowValue.tsx";

type AccountHistoryRowProps = PropsWithChildren<object>;
type AccountHistoryRowObject = FC<AccountHistoryRowProps> & {
	Badge: FC<AccountRowBadgeProps>;
	Date: FC<AccountRowDateProps>;
	Description: FC<AccountRowDescriptionProps>;
	Icon: FC<AccountRowIconProps>;
	Value: FC<AccountRowValueProps>;
}

const AccountHistoryRow: AccountHistoryRowObject = ({
	children
}) => (
	<div className="flex items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary">
		{children}
	</div>
);

AccountHistoryRow.Badge = AccountRowBadge;
AccountHistoryRow.Date = AccountRowDate;
AccountHistoryRow.Description = AccountRowDescription;
AccountHistoryRow.Icon = AccountRowIcon;
AccountHistoryRow.Value = AccountRowValue;
AccountHistoryRow.displayName = 'AccountHistoryRow';

export { AccountHistoryRow };
export type { AccountHistoryRowProps };
