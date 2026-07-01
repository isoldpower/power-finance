import {FC, useCallback} from "react";

import { PeriodSelector as PeriodSelectorView } from "@entity/dashboard";
import type { Period } from "@entity/dashboard";

import { PERIODS } from "../config.ts";


interface PeriodSelectorProps {
	className?: string;
	period: Period
	onPeriodChange: (change: { period: Period }) => void
}

const PeriodSelector: FC<PeriodSelectorProps> = ({ 
	period,
	onPeriodChange,
	className,
}) => {
	const onSelectorPeriodChange = useCallback((period: Period) => {
		onPeriodChange({ period });
	}, [onPeriodChange]);
	
	return (
		<PeriodSelectorView
			periods={PERIODS} 
			value={period} 
			onChange={onSelectorPeriodChange} 
			className={className} />
	);
};

PeriodSelector.displayName = 'PeriodSelector';

export { PeriodSelector };
export type { PeriodSelectorProps };
