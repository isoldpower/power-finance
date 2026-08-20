import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AccountSummaryTypeProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const AccountSummaryType: FC<AccountSummaryTypeProps> = ({
	children,
	...props
}) => (
	<Text
		family="numeric"
		size="9.5"
		weight="semibold"
		tone="muted"
		tracking="0.04em"
		uppercase
		className="rounded-[4px] border border-border bg-secondary px-1.5 py-0.5"
		{...props}
	>
		{children}
	</Text>
);

AccountSummaryType.displayName = 'AccountSummaryType';

export { AccountSummaryType };
export type { AccountSummaryTypeProps };
