import { FinanceComboboxEmpty } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type RuleValueEmptyProps = PropsWithChildren;

const RuleValueEmpty: FC<RuleValueEmptyProps> = ({ children }) => (
	<FinanceComboboxEmpty>
		{children}
	</FinanceComboboxEmpty>
);

RuleValueEmpty.displayName = 'RuleValueEmpty';

export { RuleValueEmpty };
export type { RuleValueEmptyProps };
