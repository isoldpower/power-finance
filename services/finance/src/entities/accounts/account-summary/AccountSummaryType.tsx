
import type { BaseHTMLAttributes, FC } from "react";
import { Text } from "@shared/pure-components/typography";


const AccountSummaryType: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
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
}

AccountSummaryType.displayName = 'AccountSummaryType';

export { AccountSummaryType };
