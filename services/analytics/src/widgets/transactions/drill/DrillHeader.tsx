import { DrillPanel } from "@entity/transactions";
import { useDrillTitle } from "@feature/transactions";
import { DotList } from "@shared/text";

import type { FC } from "react";
import type { DateRange, Drill } from "@entity/filters";


interface DrillHeaderProps {
	drill: Drill;
	range: DateRange;
	onClose: () => void;
}

const DrillHeader: FC<DrillHeaderProps> = ({ drill, range, onClose }) => {
	const { overline, title, subtitle, accent } = useDrillTitle(drill, range);

	return (
		<DrillPanel.Header
			overline={(
				<DotList>
					{overline}
				</DotList>
			)}
			title={title}
			subtitle={subtitle}
			accent={accent}
			onClose={onClose}
		/>
	);
};

DrillHeader.displayName = 'DrillHeader';

export { DrillHeader };
export type { DrillHeaderProps };
