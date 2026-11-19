import { MetaText } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface KpiTileFootnoteProps {
	children: ReactNode;
}

const KpiTileFootnote: FC<KpiTileFootnoteProps> = ({ children }) => (
	<div className="flex items-center gap-1.5">
		<MetaText size="11">
			{children}
		</MetaText>
	</div>
);

KpiTileFootnote.displayName = 'KpiTileFootnote';

export { KpiTileFootnote };
export type { KpiTileFootnoteProps };
