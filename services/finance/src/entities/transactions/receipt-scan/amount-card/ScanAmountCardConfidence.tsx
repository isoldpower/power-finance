import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ScanAmountCardConfidenceProps = PropsWithChildren;

const ScanAmountCardConfidence: FC<ScanAmountCardConfidenceProps> = ({ children }) => (
	<Caption
		as="span"
		size="10"
		tone="accent"
		className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1"
	>
		{children}
	</Caption>
);

ScanAmountCardConfidence.displayName = 'ScanAmountCardConfidence';

export { ScanAmountCardConfidence };
export type { ScanAmountCardConfidenceProps };
