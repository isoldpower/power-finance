import { Overline } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface KpiTileLabelProps {
	children: ReactNode;
}

const KpiTileLabel: FC<KpiTileLabelProps> = ({ children }) => (
	<Overline as="h3" size="10.5" tracking="0.12em">
		{children}
	</Overline>
);

KpiTileLabel.displayName = 'KpiTileLabel';

export { KpiTileLabel };
export type { KpiTileLabelProps };
