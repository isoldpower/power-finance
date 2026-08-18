import { cn } from "@internal/ui-library";
import { ActivityRowBody } from "./row/ActivityRowBody.tsx";
import { ActivityRowIcon } from "./row/ActivityRowIcon.tsx";
import { ActivityRowMoney } from "./row/ActivityRowMoney.tsx";
import { ActivityRowSeparator } from "./row/ActivityRowSeparator.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { ActivityRowBodyProps } from "./row/ActivityRowBody.tsx";
import type { ActivityRowIconProps } from "./row/ActivityRowIcon.tsx";
import type { ActivityRowMoneyProps } from "./row/ActivityRowMoney.tsx";
import type { ActivityRowSeparatorProps } from "./row/ActivityRowSeparator.tsx";


type ActivityRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {}>;
type ActivityRowObject = FC<ActivityRowProps> & {
	Body: FC<ActivityRowBodyProps>;
	Icon: FC<ActivityRowIconProps>;
	Money: FC<ActivityRowMoneyProps>;
	Separator: FC<ActivityRowSeparatorProps>;
}

const ActivityRow: ActivityRowObject = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex cursor-pointer items-center gap-3 border-b border-border",
				"px-[18px] py-2.5 last:border-b-0 hover:bg-secondary"
			)}
			{...props}
		>
			{children}
		</div>
	);
};

ActivityRow.Body = ActivityRowBody;
ActivityRow.Icon = ActivityRowIcon;
ActivityRow.Money = ActivityRowMoney;
ActivityRow.Separator = ActivityRowSeparator;
ActivityRow.displayName = 'ActivityRow';

export { ActivityRow };
export type { ActivityRowProps };
