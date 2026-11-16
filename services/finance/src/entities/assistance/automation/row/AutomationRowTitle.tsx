import { RowTitle } from "@internal/shared";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AutomationRowTitleProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AutomationRowTitle: FC<AutomationRowTitleProps> = ({
	children,
	...props
}) => (
	<RowTitle size="13.5" className="flex items-center gap-2" {...props}>
		{children}
	</RowTitle>
);

AutomationRowTitle.displayName = 'AutomationRowTitle';

export { AutomationRowTitle };
export type { AutomationRowTitleProps };
