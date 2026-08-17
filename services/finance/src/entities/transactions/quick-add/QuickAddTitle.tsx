import { CardTitle } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type QuickAddTitleProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const QuickAddTitle: FC<QuickAddTitleProps> = ({
	children,
	...props
}) => (
	<CardTitle as="h2" className="flex-1" {...props}>
		{children}
	</CardTitle>
);

QuickAddTitle.displayName = 'QuickAddTitle';

export { QuickAddTitle };
export type { QuickAddTitleProps };
