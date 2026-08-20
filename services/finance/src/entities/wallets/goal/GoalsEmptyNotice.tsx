import { Caption } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalsEmptyNoticeProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalsEmptyNotice: FC<GoalsEmptyNoticeProps> = ({
	children,
	...props
}) => (
	<Caption size="13" className="px-[18px] py-6 text-center" {...props}>
		{children}
	</Caption>
);

GoalsEmptyNotice.displayName = 'GoalsEmptyNotice';

export { GoalsEmptyNotice };
export type { GoalsEmptyNoticeProps };
