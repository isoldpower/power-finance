import { MetaText } from "@internal/shared";
import { useActiveRangeLabel } from "@feature/filters";
import { DotList } from "@shared/text";

import type { FC } from "react";


const ActiveRangeLabel: FC = () => {
	const labelParts = useActiveRangeLabel();

	return (
		<MetaText size="12" tone="subtle">
			<DotList>
				{labelParts}
			</DotList>
		</MetaText>
	);
};

ActiveRangeLabel.displayName = 'ActiveRangeLabel';

export { ActiveRangeLabel };
