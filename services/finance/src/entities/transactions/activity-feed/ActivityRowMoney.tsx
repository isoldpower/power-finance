import { MoneyInOriginal } from "@entity/localization";

import type { FC } from "react";
import type { MoneyInOriginalProps } from "@entity/localization";


interface ActivityRowMoneyProps extends Omit<MoneyInOriginalProps, 'size' | 'align'> {}

const ActivityRowMoney: FC<ActivityRowMoneyProps> = ({
	children,
	convert,
	format,
	...props
}) => {
	return (
		<MoneyInOriginal size="sm" align="end" convert={convert} format={format} {...props}>
			{children}
		</MoneyInOriginal>
	);
}

ActivityRowMoney.displayName = 'ActivityRowMoney';

export { ActivityRowMoney };