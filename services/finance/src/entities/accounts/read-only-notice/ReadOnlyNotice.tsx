import { LockIcon } from "../icons";
import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface ReadOnlyNoticeProps {
	children: ReactNode;
}

const ReadOnlyNotice: FC<ReadOnlyNoticeProps> = ({
	children
}) => (
	<div className={cn(
		"mx-0.5 mb-3.5 flex items-center gap-2.5 rounded-[var(--radius-md)]",
		"border border-border border-l-[3px] border-l-text-3 bg-secondary px-3.5 py-2.5"
	)}>
		<LockIcon className="flex-none" />
		<span className="text-[12.5px] leading-snug text-text-2">
			{children}
		</span>
	</div>
);

ReadOnlyNotice.displayName = 'ReadOnlyNotice';

export { ReadOnlyNotice };
