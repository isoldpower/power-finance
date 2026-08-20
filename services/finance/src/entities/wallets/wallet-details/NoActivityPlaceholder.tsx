import { cn } from "@internal/ui-library";
import { NoActivityPlaceholderBorder } from "./placeholder/NoActivityPlaceholderBorder.tsx";
import { NoActivityPlaceholderOriginal } from "./placeholder/NoActivityPlaceholderOriginal.tsx";
import { NoActivityPlaceholderTitle } from "./placeholder/NoActivityPlaceholderTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { NoActivityPlaceholderBorderProps } from "./placeholder/NoActivityPlaceholderBorder.tsx";
import type { NoActivityPlaceholderOriginalProps } from "./placeholder/NoActivityPlaceholderOriginal.tsx";
import type { NoActivityPlaceholderTitleProps } from "./placeholder/NoActivityPlaceholderTitle.tsx";


type NoActivityPlaceholderProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type NoActivityPlaceholderObject = FC<NoActivityPlaceholderProps> & {
	Border: FC<NoActivityPlaceholderBorderProps>;
	Original: FC<NoActivityPlaceholderOriginalProps>;
	Title: FC<NoActivityPlaceholderTitleProps>;
}

const NoActivityPlaceholder: NoActivityPlaceholderObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-3 border-b border-border px-[18px] py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

NoActivityPlaceholder.Border = NoActivityPlaceholderBorder;
NoActivityPlaceholder.Original = NoActivityPlaceholderOriginal;
NoActivityPlaceholder.Title = NoActivityPlaceholderTitle;
NoActivityPlaceholder.displayName = 'NoActivityPlaceholder';

export { NoActivityPlaceholder };
export type { NoActivityPlaceholderProps };
