
import type { BaseHTMLAttributes, FC } from "react";
import { Caption } from "@shared/pure-components/typography";


const GoalsEmptyNotice: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<Caption
			size="13"
			className="px-[18px] py-6 text-center"
			{...props}
		>
		{children}
	</Caption>
);

GoalsEmptyNotice.displayName = 'GoalsEmptyNotice';

export { GoalsEmptyNotice };
