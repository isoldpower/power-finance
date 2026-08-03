import { BalanceComposition } from "@entity/accounts";

import type { FC } from "react";


const BalanceCompositionToolbar: FC = () => {
	return (
		<BalanceComposition.Container>
			<BalanceComposition.Title>
				Balance composition
			</BalanceComposition.Title>
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
