import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AccountHistoryEmptyIconProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AccountHistoryEmptyIcon: FC<AccountHistoryEmptyIconProps> = ({
	children,
	...props
}) => (
	<Text
		as="div"
		size="17"
		tone="subtle"
		className="flex size-[38px] items-center justify-center rounded-[10px] border border-dashed border-border-strong"
		{...props}
	>
		{children}
	</Text>
);

AccountHistoryEmptyIcon.displayName = 'AccountHistoryEmptyIcon';

export { AccountHistoryEmptyIcon };
export type { AccountHistoryEmptyIconProps };
