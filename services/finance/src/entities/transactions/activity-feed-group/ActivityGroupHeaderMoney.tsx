import { FinanceMoney } from "@internal/ui-library";

import type { FinanceMoneyProps } from "@internal/ui-library";
import type { FC } from "react";


interface ActivityGroupHeaderMoneyProps extends Omit<FinanceMoneyProps, 'tone' | 'size'> {
	positive: boolean;
}

const ActivityGroupHeaderMoney: FC<ActivityGroupHeaderMoneyProps> = ({
	children,
	positive,
	...props
}) => {
	return (
		<FinanceMoney tone={positive ? 'pos' : 'neg'} size="sm" {...props}>
			{children}
		</FinanceMoney>
	);
}

ActivityGroupHeaderMoney.displayName = 'ActivityGroupHeaderMoney';

export { ActivityGroupHeaderMoney };