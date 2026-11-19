import { Caption } from "@internal/shared";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NeedsActionFailedNoticeProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const NeedsActionFailedNotice: FC<NeedsActionFailedNoticeProps> = ({
	children,
	...props
}) => (
	<Caption size="13" className="mt-4" {...props}>
		{children}
	</Caption>
);

NeedsActionFailedNotice.displayName = 'NeedsActionFailedNotice';

export { NeedsActionFailedNotice };
export type { NeedsActionFailedNoticeProps };
