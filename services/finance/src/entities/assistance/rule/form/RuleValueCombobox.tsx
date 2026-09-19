import { FinanceCombobox } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type RuleValueComboboxProps = PropsWithChildren;

const RuleValueCombobox: FC<RuleValueComboboxProps> = ({ children }) => (
	<FinanceCombobox>
		{children}
	</FinanceCombobox>
);

RuleValueCombobox.displayName = 'RuleValueCombobox';

export { RuleValueCombobox };
export type { RuleValueComboboxProps };
