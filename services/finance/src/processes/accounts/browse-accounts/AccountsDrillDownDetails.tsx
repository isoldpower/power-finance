import { DrillDownHeader } from "@entity/accounts";
import { useAccountsConvertion, useAccountHistory, useAccountsBrowser } from "@feature/accounts";
import { AccountsDrillDown } from "@widget/accounts";
import { Caption, Overline } from "@shared/pure-components/typography";

import type { FC } from "react";


const AccountsDrillDownDetails: FC = () => {
	const { category, account, accountId, setAccountId } = useAccountsBrowser();
	const { convertToUserCurrency, convertToUserCurrencyWithSign } = useAccountsConvertion();
	const { history } = useAccountHistory(accountId);

	return (
		<>
			<DrillDownHeader.Container>
				<Overline as="span" size="10" tracking="0.12em">
					Drill-down
				</Overline>
				<Caption as="span">
					{category.label} → account → history
				</Caption>
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
