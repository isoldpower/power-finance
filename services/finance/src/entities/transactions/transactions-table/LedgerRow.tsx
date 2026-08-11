import { LedgerRowContainer } from "./LedgerRowContainer.tsx";
import { LedgerRowSelectCell } from "./LedgerRowSelectCell.tsx";
import { LedgerRowDateCell } from "./LedgerRowDateCell.tsx";
import { LedgerRowDescription } from "./LedgerRowDescription.tsx";
import { LedgerRowIcon } from "./LedgerRowIcon.tsx";
import { LedgerRowWallet } from "./LedgerRowWallet.tsx";
import { LedgerRowCategory } from "./LedgerRowCategory.tsx";
import { LedgerRowAmount } from "./LedgerRowAmount.tsx";
import { LedgerRowConvertedAmount } from "./LedgerRowConvertedAmount.tsx";
import { LedgerRowChevron } from "./LedgerRowChevron.tsx";


function LedgerRow() {
	return null;
}

LedgerRow.displayName = 'LedgerRow';
LedgerRow.Container = LedgerRowContainer;
LedgerRow.SelectCell = LedgerRowSelectCell;
LedgerRow.DateCell = LedgerRowDateCell;
LedgerRow.Description = LedgerRowDescription;
LedgerRow.Icon = LedgerRowIcon;
LedgerRow.Wallet = LedgerRowWallet;
LedgerRow.Category = LedgerRowCategory;
LedgerRow.Amount = LedgerRowAmount;
LedgerRow.ConvertedAmount = LedgerRowConvertedAmount;
LedgerRow.Chevron = LedgerRowChevron;

export { LedgerRow };
