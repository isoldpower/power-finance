import { cn } from "@internal/ui-library";
import { ActivityGroupHeaderMoney } from "./group-header/ActivityGroupHeaderMoney.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ActivityGroupHeaderMoneyProps } from "./group-header/ActivityGroupHeaderMoney.tsx";


type ActivityGroupHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type ActivityGroupHeaderObject = FC<ActivityGroupHeaderProps> & {
	Money: FC<ActivityGroupHeaderMoneyProps>;
}

const ActivityGroupHeader: ActivityGroupHeaderObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center justify-between border-b",
			"border-border bg-secondary px-[18px] py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

ActivityGroupHeader.Money = ActivityGroupHeaderMoney;
ActivityGroupHeader.displayName = 'ActivityGroupHeader';

export { ActivityGroupHeader };
export type { ActivityGroupHeaderProps };
