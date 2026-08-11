import { BalanceComposition } from "@entity/accounts";
import { CardTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


const BalanceCompositionToolbar: FC = () => {
	return (
		<BalanceComposition.Container>
			<CardTitle>
				Balance composition
			</CardTitle>
			<BalanceComposition.Formula>
				Assets = Liabilities + Equity
			</BalanceComposition.Formula>
			<div className="flex-1" />
			<BalanceComposition.Hint>
				select a category to drill in
			</BalanceComposition.Hint>
		</BalanceComposition.Container>
	);
};

BalanceCompositionToolbar.displayName = 'BalanceCompositionToolbar';

export { BalanceCompositionToolbar };
