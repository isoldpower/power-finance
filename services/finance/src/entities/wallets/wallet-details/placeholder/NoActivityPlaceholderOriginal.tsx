import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NoActivityPlaceholderOriginalProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const NoActivityPlaceholderOriginal: FC<NoActivityPlaceholderOriginalProps> = ({
	children,
	...props
}) => (
	<Text as="div" size="13" weight="medium" tone="subtle" className="opacity-50" {...props}>
		{children}
	</Text>
);

NoActivityPlaceholderOriginal.displayName = 'NoActivityPlaceholderOriginal';

export { NoActivityPlaceholderOriginal };
export type { NoActivityPlaceholderOriginalProps };
