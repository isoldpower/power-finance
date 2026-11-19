import { DisplayText } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface KpiTileValueProps {
	children: ReactNode;
}

const KpiTileValue: FC<KpiTileValueProps> = ({ children }) => (
	<DisplayText size="19" leading="1.1" truncate>
		{children}
	</DisplayText>
);

KpiTileValue.displayName = 'KpiTileValue';

export { KpiTileValue };
export type { KpiTileValueProps };
