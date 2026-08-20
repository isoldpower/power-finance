import { Caption } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AutomationsEmptyNoticeProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AutomationsEmptyNotice: FC<AutomationsEmptyNoticeProps> = ({
	children,
	...props
}) => (
	<Caption size="13" className="px-[18px] py-6 text-center" {...props}>
		{children}
	</Caption>
);

AutomationsEmptyNotice.displayName = 'AutomationsEmptyNotice';

export { AutomationsEmptyNotice };
export type { AutomationsEmptyNoticeProps };
