import type { FC } from "react";

import { DateLabel } from "@entity/metrics";
import { useLongDateLabel } from "@feature/localization";


const LongCurrentDateLabel: FC = () => {
	const dateLabel = useLongDateLabel();

	return (
		<DateLabel>
			{dateLabel}
		</DateLabel>
	);
};

LongCurrentDateLabel.displayName = 'LongCurrentDateLabel';

export { LongCurrentDateLabel };
