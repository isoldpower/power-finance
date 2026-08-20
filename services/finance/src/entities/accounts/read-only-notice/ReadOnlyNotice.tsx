import { cn } from "@internal/ui-library";
import { LockIcon } from "@shared/pure-components/icons";
import { BodyText } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface ReadOnlyNoticeProps {
	children: ReactNode;
}

const ReadOnlyNotice: FC<ReadOnlyNoticeProps> = ({
	children
}) => (
	<div 
		className={cn(
			"mx-0.5 mb-3.5 flex items-center gap-2.5 rounded-[var(--radius-md)]",
			"border border-border border-l-[3px] border-l-text-3 bg-secondary px-3.5 py-2.5"
		)}
	>
		<LockIcon className="flex-none" />
		<BodyText as="span" size="12.5" leading="snug">
			{children}
		</BodyText>
	</div>
);

ReadOnlyNotice.displayName = 'ReadOnlyNotice';

export { ReadOnlyNotice };
export type { ReadOnlyNoticeProps };
