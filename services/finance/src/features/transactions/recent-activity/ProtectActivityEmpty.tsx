import { Caption } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface ProtectActivityEmptyProps {
	activityGroups: unknown[]
	children: ReactNode;
}

const ProtectActivityEmpty: FC<ProtectActivityEmptyProps> = ({
	activityGroups,
	children,
}) => {
	if (activityGroups.length === 0) {
		return (
			<Caption size="13" className="px-[18px] py-8 text-center">
				No recent activity.
			</Caption>
		);
	}
	
	return children;
}

export { ProtectActivityEmpty };