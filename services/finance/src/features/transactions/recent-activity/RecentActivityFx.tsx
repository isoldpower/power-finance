import type { FC, ReactNode } from "react";


interface RecentActivityFxProps {
	isPending: boolean;
	pending: ReactNode;
	children: ReactNode;
}

const RecentActivityFx: FC<RecentActivityFxProps> = ({ isPending, pending, children }) => {
	if (isPending) return <>{pending}</>;

	return <>{children}</>;
};

RecentActivityFx.displayName = 'RecentActivityFx';

export { RecentActivityFx };
export type { RecentActivityFxProps };
