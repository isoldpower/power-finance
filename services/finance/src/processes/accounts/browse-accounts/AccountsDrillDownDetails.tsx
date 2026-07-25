import type { FC } from "react";

import { useAccountsConvertion, useAccountHistory } from "@feature/accounts";
import { useAccountsBrowser } from "@feature/accounts/browse-accounts/BrowseAccountsContext.tsx";
import { AccountsDrillDown } from "@widget/accounts/drill-down/AccountsDrillDown.tsx";


const AccountsDrillDownDetails: FC = () => {
	const { category, account, accountId, setAccountId } = useAccountsBrowser();
	const { convertToUserCurrency, convertToUserCurrencyWithSign } = useAccountsConvertion();
	const { history } = useAccountHistory();

	return (
		<>
			<div className="mx-0.5 mb-2.5 flex items-center gap-2.5">
				<span className="font-numeric text-[10px] uppercase tracking-[0.12em] text-text-3">Drill-down</span>
				<span className="text-[12.5px] text-text-3">{category.label} → account → history</span>
				<div className="h-px flex-1 bg-border" />
			</div>
			<AccountsDrillDown
				category={category}
				account={account}
				accountId={accountId}
				setAccountId={setAccountId}
				history={history}
				convertToUserCurrency={convertToUserCurrency}
				convertToUserCurrencyWithSign={convertToUserCurrencyWithSign}
			/>
		</>
	);
};

AccountsDrillDownDetails.displayName = 'AccountsDrillDownDetails';

export { AccountsDrillDownDetails };
