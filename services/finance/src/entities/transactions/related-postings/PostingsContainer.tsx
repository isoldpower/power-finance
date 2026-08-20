import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type PostingsContainerProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const PostingsContainer: FC<PostingsContainerProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5 rounded-[9px]",
			"border border-border-strong bg-card px-3 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

PostingsContainer.displayName = 'PostingsContainer';

export { PostingsContainer };
export type { PostingsContainerProps };
