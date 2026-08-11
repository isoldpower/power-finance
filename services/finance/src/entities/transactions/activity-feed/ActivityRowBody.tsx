import type { BaseHTMLAttributes, FC } from "react";

import { Caption } from "@shared/pure-components/typography";


const ActivityRowBody: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<Caption
			size="11.5"
			className="flex items-center gap-1.5"
			{...props}
		>
			{children}
		</Caption>
	);
}

ActivityRowBody.displayName = 'ActivityRowBody';

export { ActivityRowBody };
