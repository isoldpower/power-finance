import { AccountListItemContainer } from "./AccountListItemContainer.tsx";
import { AccountListItemSwatch } from "./AccountListItemSwatch.tsx";
import { AccountListItemName } from "./AccountListItemName.tsx";
import { AccountListItemKind } from "./AccountListItemKind.tsx";
import { AccountListItemBalance } from "./AccountListItemBalance.tsx";


function AccountListItem() {
	return null;
}

AccountListItem.displayName = 'AccountListItem';
AccountListItem.Container = AccountListItemContainer;
AccountListItem.Swatch = AccountListItemSwatch;
AccountListItem.Name = AccountListItemName;
AccountListItem.Kind = AccountListItemKind;
AccountListItem.Balance = AccountListItemBalance;

export { AccountListItem };
