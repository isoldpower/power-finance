import { cn } from "@internal/ui-library";
import { AccountListItemBalance } from "./list-item/AccountListItemBalance.tsx";
import { AccountListItemSwatch } from "./list-item/AccountListItemSwatch.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AccountListItemBalanceProps } from "./list-item/AccountListItemBalance.tsx";
import type { AccountListItemSwatchProps } from "./list-item/AccountListItemSwatch.tsx";


type AccountListItemProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	active: boolean;
	accentColor: string;
}>;
type AccountListItemObject = FC<AccountListItemProps> & {
	Balance: FC<AccountListItemBalanceProps>;
	Swatch: FC<AccountListItemSwatchProps>;
}

const AccountListItem: AccountListItemObject = ({
	children,
	active,
	accentColor,
	...props
}) => (
	<div
		className={cn(
			"flex cursor-pointer items-center gap-2.5 border-b border-l-[3px] border-border px-4 py-3",
			active ? "bg-secondary" : "hover:bg-secondary"
		)}
		style={{ borderLeftColor: active ? accentColor : 'transparent' }}
		{...props}
	>
		{children}
	</div>
);

AccountListItem.Balance = AccountListItemBalance;
AccountListItem.Swatch = AccountListItemSwatch;
AccountListItem.displayName = 'AccountListItem';

export { AccountListItem };
export type { AccountListItemProps };
