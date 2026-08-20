import { DrillDownHeader } from "@entity/accounts";
import { useAccountHistory, useAccountsBrowser } from "@feature/accounts";
import { AccountsDrillDown } from "@widget/accounts";
import { Caption, Overline } from "@shared/pure-components/typography";

import type { FC } from "react";


const AccountsDrillDownDetails: FC = () => {
	const { category, account, accountId, setAccountId } = useAccountsBrowser();
	const { history } = useAccountHistory(accountId);

	if (!category || !account) {
		return null;
	}

	return (
		<>
			<DrillDownHeader>
				<Overline as="span" size="10" tracking="0.12em">
					Drill-down
				</Overline>
				<Caption as="span">
					{category.label} → account → history
				</Caption>
				<DrillDownHeader.Rule />
			</DrillDownHeader>
			<AccountsDrillDown
				category={category}
				account={account}
				accountId={accountId}
				setAccountId={setAccountId}
				history={history}
			/>
		</>
	);
};

AccountsDrillDownDetails.displayName = 'AccountsDrillDownDetails';

export { AccountsDrillDownDetails };
