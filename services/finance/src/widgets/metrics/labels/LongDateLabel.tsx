import { useMemo } from "react";
import { Overline } from "@shared/pure-components/typography";
import { useLongDateLabel } from "@feature/localization";

import type { FC } from "react";


const LongCurrentDateLabel: FC = () => {
	const nowDate = useMemo(() => {
		return new Date();
	}, []);
	const dateLabel = useLongDateLabel(nowDate);

	return (
		<Overline as="span">
			{dateLabel}
		</Overline>
	);
};

LongCurrentDateLabel.displayName = 'LongCurrentDateLabel';

export { LongCurrentDateLabel };
