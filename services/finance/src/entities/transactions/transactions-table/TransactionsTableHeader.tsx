import { Overline } from "@shared/pure-components/typography";
import { TableHeaderSelectCell } from "./table-header/TableHeaderSelectCell.tsx";
import { TableHeaderDateCell } from "./table-header/TableHeaderDateCell.tsx";
import { TableHeaderDescription } from "./table-header/TableHeaderDescription.tsx";
import { TableHeaderWallet } from "./table-header/TableHeaderWallet.tsx";
import { TableHeaderCategory } from "./table-header/TableHeaderCategory.tsx";
import { TableHeaderAmount } from "./table-header/TableHeaderAmount.tsx";
import { TableHeaderConvertedAmount } from "./table-header/TableHeaderConvertedAmount.tsx";
import { TableHeaderChevron } from "./table-header/TableHeaderChevron.tsx";

import type { FC, PropsWithChildren } from "react";
import type { TableHeaderSelectCellProps } from "./table-header/TableHeaderSelectCell.tsx";
import type { TableHeaderDateCellProps } from "./table-header/TableHeaderDateCell.tsx";
import type { TableHeaderDescriptionProps } from "./table-header/TableHeaderDescription.tsx";
import type { TableHeaderWalletProps } from "./table-header/TableHeaderWallet.tsx";
import type { TableHeaderCategoryProps } from "./table-header/TableHeaderCategory.tsx";
import type { TableHeaderAmountProps } from "./table-header/TableHeaderAmount.tsx";
import type { TableHeaderConvertedAmountProps } from "./table-header/TableHeaderConvertedAmount.tsx";
import type { TableHeaderChevronProps } from "./table-header/TableHeaderChevron.tsx";


type TransactionsTableHeaderProps = PropsWithChildren;
type TransactionsTableHeaderObject = FC<TransactionsTableHeaderProps> & {
	SelectCell: FC<TableHeaderSelectCellProps>;
	DateCell: FC<TableHeaderDateCellProps>;
	Description: FC<TableHeaderDescriptionProps>;
	Wallet: FC<TableHeaderWalletProps>;
	Category: FC<TableHeaderCategoryProps>;
	Amount: FC<TableHeaderAmountProps>;
	ConvertedAmount: FC<TableHeaderConvertedAmountProps>;
	Chevron: FC<TableHeaderChevronProps>;
}

const TransactionsTableHeader: TransactionsTableHeaderObject = ({ children }) => (
	<Overline
		size="10"
		tracking="0.06em"
		className="flex items-center border-b border-border bg-secondary px-4 py-2.5"
	>
		{children}
	</Overline>
);

TransactionsTableHeader.SelectCell = TableHeaderSelectCell;
TransactionsTableHeader.DateCell = TableHeaderDateCell;
TransactionsTableHeader.Description = TableHeaderDescription;
TransactionsTableHeader.Wallet = TableHeaderWallet;
TransactionsTableHeader.Category = TableHeaderCategory;
TransactionsTableHeader.Amount = TableHeaderAmount;
TransactionsTableHeader.ConvertedAmount = TableHeaderConvertedAmount;
TransactionsTableHeader.Chevron = TableHeaderChevron;
TransactionsTableHeader.displayName = 'TransactionsTableHeader';

export { TransactionsTableHeader };
export type { TransactionsTableHeaderProps };
