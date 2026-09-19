import { FinanceComboboxList } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type RuleValueListProps = PropsWithChildren;

const RuleValueList: FC<RuleValueListProps> = ({ children }) => (
	<FinanceComboboxList>
		{children}
	</FinanceComboboxList>
);

RuleValueList.displayName = 'RuleValueList';

export { RuleValueList };
export type { RuleValueListProps };
