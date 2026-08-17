import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ScanFieldRowAiBadgeProps = PropsWithChildren;

const ScanFieldRowAiBadge: FC<ScanFieldRowAiBadgeProps> = ({ children }) => (
	<Text
		family="numeric"
		size="8.5"
		weight="semibold"
		tone="accent"
		className="rounded-[4px] border border-[var(--accent-border)] px-1"
	>
		{children}
	</Text>
);

ScanFieldRowAiBadge.displayName = 'ScanFieldRowAiBadge';

export { ScanFieldRowAiBadge };
export type { ScanFieldRowAiBadgeProps };
