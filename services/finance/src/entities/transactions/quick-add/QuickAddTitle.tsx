import type { FC, BaseHTMLAttributes } from "react";
import { CardTitle } from "@shared/pure-components/typography";


const QuickAddTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<CardTitle as="h2" className="flex-1" {...props}>
		{children}
	</CardTitle>
);

export { QuickAddTitle };