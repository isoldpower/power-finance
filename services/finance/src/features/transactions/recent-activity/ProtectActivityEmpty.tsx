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
			<div className="px-[18px] py-8 text-center text-[13px] text-text-3">
				No recent activity.
			</div>
		);
	}
	
	return children;
}

export { ProtectActivityEmpty };