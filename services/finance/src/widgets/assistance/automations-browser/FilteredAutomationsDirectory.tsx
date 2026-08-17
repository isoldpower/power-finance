import { Fragment } from "react";

import {
	ProtectAutomationsEmpty,
	useAutomations,
	useAutomationsPaginationContext,
} from "@feature/assistance";

import type { FC, ReactNode } from "react";
import type { Automation } from "@entity/assistance";


interface FilteredAutomationsDirectoryProps {
	children: (rule: Automation, index: number) => ReactNode;
}

const FilteredAutomationsDirectory: FC<FilteredAutomationsDirectoryProps> = ({ children }) => {
	const { paginatedRules, total, pageNumber } = useAutomationsPaginationContext();
	const { rules } = useAutomations();

	return (
		<ProtectAutomationsEmpty rules={rules} total={total}>
			{paginatedRules.map((rule, index) => (
				<Fragment key={`${pageNumber.toString()}-${rule.id}`}>
					{children(rule, index)}
				</Fragment>
			))}
		</ProtectAutomationsEmpty>
	);
}

export { FilteredAutomationsDirectory };
export type { FilteredAutomationsDirectoryProps };
