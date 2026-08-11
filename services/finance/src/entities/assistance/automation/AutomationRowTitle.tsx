
import type { BaseHTMLAttributes, FC } from "react";
import { RowTitle } from "@shared/pure-components/typography";


const AutomationRowTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<RowTitle
			size="13.5"
			className="flex items-center gap-2"
			{...props}
		>
		{children}
	</RowTitle>
);

AutomationRowTitle.displayName = 'AutomationRowTitle';

export { AutomationRowTitle };
