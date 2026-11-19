import { Text } from "@internal/shared";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NeedsActionRowSubtitleProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const NeedsActionRowSubtitle: FC<NeedsActionRowSubtitleProps> = ({
	children,
	...props
}) => (
	<Text as="p" size="xs" tone="muted" className="mt-px" {...props}>
		{children}
	</Text>
);

NeedsActionRowSubtitle.displayName = 'NeedsActionRowSubtitle';

export { NeedsActionRowSubtitle };
export type { NeedsActionRowSubtitleProps };
