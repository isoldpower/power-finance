import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface AccountListItemSwatchProps {
	color: string;
}

const AccountListItemSwatch: FC<AccountListItemSwatchProps> = ({ color }) => (
	<span
		className={cn(
			"size-2 flex-none rounded-[2px]"
		)}
		style={{ background: color }}
	/>
);

AccountListItemSwatch.displayName = 'AccountListItemSwatch';

export { AccountListItemSwatch };
export type { AccountListItemSwatchProps };
