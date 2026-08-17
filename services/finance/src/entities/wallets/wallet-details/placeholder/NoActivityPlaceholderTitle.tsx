import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NoActivityPlaceholderTitleProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const NoActivityPlaceholderTitle: FC<NoActivityPlaceholderTitleProps> = ({
	children,
	...props
}) => (
	<Text
		as="div"
		size="13"
		weight="medium"
		tone="subtle"
		className={cn(
			"absolute bottom-0 left-0 top-0 flex flex-col items-center justify-center opacity-50"
		)}
		{...props}
	>
		{children}
	</Text>
);

NoActivityPlaceholderTitle.displayName = 'NoActivityPlaceholderTitle';

export { NoActivityPlaceholderTitle };
export type { NoActivityPlaceholderTitleProps };
