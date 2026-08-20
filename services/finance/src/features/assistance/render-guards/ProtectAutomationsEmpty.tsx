import { AutomationsEmptyNotice } from "@entity/assistance";

import type { FC, ReactNode } from "react";


interface ProtectAutomationsEmptyProps {
	rules: unknown[];
	total: number;
	children: ReactNode;
}

const ProtectAutomationsEmpty: FC<ProtectAutomationsEmptyProps> = ({ 
	rules,
	total,
	children,
}) => {
	if (total === 0) {
		return (
			<AutomationsEmptyNotice>
				{rules.length === 0 
					? 'No automations yet.' 
					: 'No rules match your search.'}
			</AutomationsEmptyNotice>
		);
	}
	
	return children;
}

export { ProtectAutomationsEmpty };