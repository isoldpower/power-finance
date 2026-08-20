import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantSheetProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantSheet: FC<AssistantSheetProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"fixed inset-x-3 bottom-3 top-16 z-[41] flex animate-in slide-in-from-bottom duration-200"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantSheet.displayName = 'AssistantSheet';

export { AssistantSheet };
export type { AssistantSheetProps };
