import { useMemo } from "react";
import type { FC } from "react";

import { DateLabel } from "@entity/metrics";
import { useLongDateLabel } from "@feature/localization";


const LongCurrentDateLabel: FC = () => {
	const nowDate = useMemo(() => {
		return new Date();
	}, []);
	const dateLabel = useLongDateLabel(nowDate);

	return (
		<DateLabel>
			{dateLabel}
		</DateLabel>
	);
};

LongCurrentDateLabel.displayName = 'LongCurrentDateLabel';

export { LongCurrentDateLabel };
