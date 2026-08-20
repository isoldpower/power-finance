import { ExpenseIcon, IncomeIcon } from "@shared/pure-components/icons";

import type { FunctionComponent } from "react";
import type { AmountDirectionIconProps } from "@shared/pure-components/icons";
import type { TransactionType } from "../types.ts";


const ICON_BY_TYPE: Record<TransactionType, FunctionComponent<AmountDirectionIconProps>> = {
	income: IncomeIcon,
	expense: ExpenseIcon,
};

const resolveDirectionIcon = (type: TransactionType): FunctionComponent<AmountDirectionIconProps> => {
	return ICON_BY_TYPE[type];
};

export { resolveDirectionIcon };
