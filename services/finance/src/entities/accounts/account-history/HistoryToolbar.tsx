import { cn } from "@internal/ui-library";
import { HistoryToolbarCount } from "./toolbar/HistoryToolbarCount.tsx";
import { HistoryToolbarHint } from "./toolbar/HistoryToolbarHint.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { HistoryToolbarCountProps } from "./toolbar/HistoryToolbarCount.tsx";
import type { HistoryToolbarHintProps } from "./toolbar/HistoryToolbarHint.tsx";


type HistoryToolbarProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type HistoryToolbarObject = FC<HistoryToolbarProps> & {
	Count: FC<HistoryToolbarCountProps>;
	Hint: FC<HistoryToolbarHintProps>;
}

const HistoryToolbar: HistoryToolbarObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5 border-b border-border px-[18px] py-3"
		)}
		{...props}
	>
		{children}
	</div>
);

HistoryToolbar.Count = HistoryToolbarCount;
HistoryToolbar.Hint = HistoryToolbarHint;
HistoryToolbar.displayName = 'HistoryToolbar';

export { HistoryToolbar };
export type { HistoryToolbarProps };
