import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantComposerProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantComposer: FC<AssistantComposerProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-auto border-t border-border px-3.5 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantComposer.displayName = 'AssistantComposer';

export { AssistantComposer };
export type { AssistantComposerProps };
