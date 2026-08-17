import { cn } from "@internal/ui-library";
import { NeedsActionSkeletonAction } from "./skeleton-row/NeedsActionSkeletonAction.tsx";
import { NeedsActionSkeletonBody } from "./skeleton-row/NeedsActionSkeletonBody.tsx";
import { NeedsActionSkeletonIcon } from "./skeleton-row/NeedsActionSkeletonIcon.tsx";
import { NeedsActionSkeletonSubtitle } from "./skeleton-row/NeedsActionSkeletonSubtitle.tsx";
import { NeedsActionSkeletonTitle } from "./skeleton-row/NeedsActionSkeletonTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { NeedsActionSkeletonBodyProps } from "./skeleton-row/NeedsActionSkeletonBody.tsx";


type NeedsActionSkeletonRowProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type NeedsActionSkeletonRowObject = FC<NeedsActionSkeletonRowProps> & {
	Action: FC;
	Body: FC<NeedsActionSkeletonBodyProps>;
	Icon: FC;
	Subtitle: FC;
	Title: FC;
}

const NeedsActionSkeletonRow: NeedsActionSkeletonRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-3.5 border-b border-border px-[18px] py-3.5 last:border-b-0"
		)}
		{...props}
	>
		{children}
	</div>
);

NeedsActionSkeletonRow.Action = NeedsActionSkeletonAction;
NeedsActionSkeletonRow.Body = NeedsActionSkeletonBody;
NeedsActionSkeletonRow.Icon = NeedsActionSkeletonIcon;
NeedsActionSkeletonRow.Subtitle = NeedsActionSkeletonSubtitle;
NeedsActionSkeletonRow.Title = NeedsActionSkeletonTitle;
NeedsActionSkeletonRow.displayName = 'NeedsActionSkeletonRow';

export { NeedsActionSkeletonRow };
export type { NeedsActionSkeletonRowProps };
