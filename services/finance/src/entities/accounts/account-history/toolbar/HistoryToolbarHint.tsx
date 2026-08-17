import { MetaText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type HistoryToolbarHintProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const HistoryToolbarHint: FC<HistoryToolbarHintProps> = ({
	children,
	...props
}) => (
	<MetaText
		size="10"
		tone="subtle"
		className="hidden sm:block"
		{...props}
	>
		{children}
	</MetaText>
);

HistoryToolbarHint.displayName = 'HistoryToolbarHint';

export { HistoryToolbarHint };
export type { HistoryToolbarHintProps };
