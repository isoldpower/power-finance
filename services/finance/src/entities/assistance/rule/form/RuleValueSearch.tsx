import { FinanceComboboxInput } from "@internal/ui-library";

import type { FC } from "react";


interface RuleValueSearchProps {
	placeholder: string;
}

const RuleValueSearch: FC<RuleValueSearchProps> = ({ placeholder }) => (
	<FinanceComboboxInput placeholder={placeholder} />
);

RuleValueSearch.displayName = 'RuleValueSearch';

export { RuleValueSearch };
export type { RuleValueSearchProps };
