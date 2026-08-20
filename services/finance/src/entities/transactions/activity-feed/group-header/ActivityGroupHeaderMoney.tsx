import { FinanceMoney } from "@internal/ui-library";

import type { FC } from "react";
import type { FinanceMoneyProps } from "@internal/ui-library";


type ActivityGroupHeaderMoneyProps = Omit<FinanceMoneyProps, 'tone' | 'size'> & {
	positive: boolean;
};

const ActivityGroupHeaderMoney: FC<ActivityGroupHeaderMoneyProps> = ({
	children,
	positive,
	...props
}) => (
	<FinanceMoney tone={positive ? 'pos' : 'neg'} size="sm" {...props}>
		{children}
	</FinanceMoney>
);

ActivityGroupHeaderMoney.displayName = 'ActivityGroupHeaderMoney';

export { ActivityGroupHeaderMoney };
export type { ActivityGroupHeaderMoneyProps };
