import { ExpenseIcon, IncomeIcon } from "./DirectionIcons.tsx";

import type { TransactionDirection } from "../types.ts";
import type { FC, FunctionComponent } from "react";
import type { AmountDirectionIconProps } from "./DirectionIcons.tsx";


const ICON_BY_DIRECTION: Record<TransactionDirection, FunctionComponent<AmountDirectionIconProps>> = {
	in: IncomeIcon,
	out: ExpenseIcon,
};

interface DirectionIconProps extends AmountDirectionIconProps {
	direction: TransactionDirection;
}

const AmountDirectionIcon: FC<DirectionIconProps> = ({ direction, ...iconProps }) => {
	const IconElement = ICON_BY_DIRECTION[direction];

	return (
		<IconElement {...iconProps} />
	);
};

AmountDirectionIcon.displayName = 'AmountDirectionIcon';

export { AmountDirectionIcon };
export type { DirectionIconProps };
