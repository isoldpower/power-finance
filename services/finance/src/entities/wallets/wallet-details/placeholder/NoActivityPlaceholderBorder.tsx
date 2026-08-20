import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


type NoActivityPlaceholderBorderProps = Omit<
	BaseHTMLAttributes<HTMLDivElement>,
	'className' | 'children'
>;

const NoActivityPlaceholderBorder: FC<NoActivityPlaceholderBorderProps> = ({ ...props }) => (
	<div
		className={cn(
			"size-[30px] flex-none rounded-[8px]",
			"border border-dashed border-border-strong"
		)}
		{...props}
	/>
);

NoActivityPlaceholderBorder.displayName = 'NoActivityPlaceholderBorder';

export { NoActivityPlaceholderBorder };
export type { NoActivityPlaceholderBorderProps };
