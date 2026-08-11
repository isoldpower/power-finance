import { useMemo } from "react";
import type { FC } from "react";

import { useLongDateLabel } from "@feature/localization";
import { Overline } from "@shared/pure-components/typography";


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
