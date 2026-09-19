import { FinanceMoney } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type GoalProgressValueProps = PropsWithChildren;

const GoalProgressValue: FC<GoalProgressValueProps> = ({ children }) => (
	<FinanceMoney tone="muted" size="sm" className="w-[34px] text-right">
		{children}
	</FinanceMoney>
);

GoalProgressValue.displayName = 'GoalProgressValue';

export { GoalProgressValue };
export type { GoalProgressValueProps };
