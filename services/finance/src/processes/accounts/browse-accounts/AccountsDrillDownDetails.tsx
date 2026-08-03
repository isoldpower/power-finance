import { DrillDownHeader } from "@entity/accounts";
import { useAccountsConvertion, useAccountHistory, useAccountsBrowser } from "@feature/accounts";
import { AccountsDrillDown } from "@widget/accounts";

import type { FC } from "react";


const AccountsDrillDownDetails: FC = () => {
	const { category, account, accountId, setAccountId } = useAccountsBrowser();
	const { convertToUserCurrency, convertToUserCurrencyWithSign } = useAccountsConvertion();
	const { history } = useAccountHistory(accountId);

	return (
		<>
			<DrillDownHeader.Container>
				<DrillDownHeader.Label>
					Drill-down
				</DrillDownHeader.Label>
				<DrillDownHeader.Caption>
					{category.label} → account → history
				</DrillDownHeader.Caption>
				<DrillDownHeader.Rule />
			</DrillDownHeader.Container>
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
