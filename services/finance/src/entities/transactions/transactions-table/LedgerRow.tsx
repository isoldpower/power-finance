import { cn } from "@internal/ui-library";
import { LedgerRowAmount } from "./row/LedgerRowAmount.tsx";
import { LedgerRowCategory } from "./row/LedgerRowCategory.tsx";
import { LedgerRowChevron } from "./row/LedgerRowChevron.tsx";
import { LedgerRowConvertedAmount } from "./row/LedgerRowConvertedAmount.tsx";
import { LedgerRowDateCell } from "./row/LedgerRowDateCell.tsx";
import { LedgerRowDescription } from "./row/LedgerRowDescription.tsx";
import { LedgerRowIcon } from "./row/LedgerRowIcon.tsx";
import { LedgerRowSelectCell } from "./row/LedgerRowSelectCell.tsx";
import { LedgerRowWallet } from "./row/LedgerRowWallet.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { LedgerRowAmountProps } from "./row/LedgerRowAmount.tsx";
import type { LedgerRowCategoryProps } from "./row/LedgerRowCategory.tsx";
import type { LedgerRowChevronProps } from "./row/LedgerRowChevron.tsx";
import type { LedgerRowConvertedAmountProps } from "./row/LedgerRowConvertedAmount.tsx";
import type { LedgerRowDateCellProps } from "./row/LedgerRowDateCell.tsx";
import type { LedgerRowDescriptionProps } from "./row/LedgerRowDescription.tsx";
import type { LedgerRowIconProps } from "./row/LedgerRowIcon.tsx";
import type { LedgerRowSelectCellProps } from "./row/LedgerRowSelectCell.tsx";
import type { LedgerRowWalletProps } from "./row/LedgerRowWallet.tsx";


type LedgerRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	expanded: boolean;
}>;
type LedgerRowObject = FC<LedgerRowProps> & {
	Amount: FC<LedgerRowAmountProps>;
	Category: FC<LedgerRowCategoryProps>;
	Chevron: FC<LedgerRowChevronProps>;
	ConvertedAmount: FC<LedgerRowConvertedAmountProps>;
	DateCell: FC<LedgerRowDateCellProps>;
	Description: FC<LedgerRowDescriptionProps>;
	Icon: FC<LedgerRowIconProps>;
	SelectCell: FC<LedgerRowSelectCellProps>;
	Wallet: FC<LedgerRowWalletProps>;
}

const LedgerRow: LedgerRowObject = ({
	children,
	expanded,
	...props
}) => (
	<div
		className={cn(
			"flex h-14 cursor-pointer items-center px-4",
			!expanded && "hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</div>
);

LedgerRow.Amount = LedgerRowAmount;
LedgerRow.Category = LedgerRowCategory;
LedgerRow.Chevron = LedgerRowChevron;
LedgerRow.ConvertedAmount = LedgerRowConvertedAmount;
LedgerRow.DateCell = LedgerRowDateCell;
LedgerRow.Description = LedgerRowDescription;
LedgerRow.Icon = LedgerRowIcon;
LedgerRow.SelectCell = LedgerRowSelectCell;
LedgerRow.Wallet = LedgerRowWallet;
LedgerRow.displayName = 'LedgerRow';

export { LedgerRow };
export type { LedgerRowProps };
