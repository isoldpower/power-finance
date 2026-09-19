import { FinanceComboboxContent } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type RuleValueContentProps = PropsWithChildren;

const RuleValueContent: FC<RuleValueContentProps> = ({ children }) => (
	<FinanceComboboxContent>
		{children}
	</FinanceComboboxContent>
);

RuleValueContent.displayName = 'RuleValueContent';

export { RuleValueContent };
export type { RuleValueContentProps };
