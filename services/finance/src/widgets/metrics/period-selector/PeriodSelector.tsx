import { PeriodButton, PeriodTabsContainer } from "@entity/metrics";
import { useMetricsPreferences } from "@feature/metrics";
import { useShallow } from "zustand/react/shallow";

import type { FC } from "react";
import type { Period } from "@entity/metrics";


interface PeriodSelectorProps {
	fullList: readonly Period[];
}

const PeriodSelector: FC<PeriodSelectorProps> = ({ 
	fullList,
}) => {
	const { metricsPeriod, changePeriod } = useMetricsPreferences(
		useShallow((state) => ({ 
			metricsPeriod: state.metricsPeriod,
			changePeriod: state.changePeriod,
		}))
	);
	
	return (
		<PeriodTabsContainer>
			{fullList.map((iterationPeriod) => (
				<PeriodButton
					onClick={() => { changePeriod(iterationPeriod); }} 
					isSelected={metricsPeriod === iterationPeriod} 
					key={iterationPeriod}
				>
					{iterationPeriod}
				</PeriodButton>
			))}
		</PeriodTabsContainer>
	);
};

PeriodSelector.displayName = 'PeriodSelector';

export { PeriodSelector };
export type { PeriodSelectorProps };
