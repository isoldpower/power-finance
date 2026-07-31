import type { FC, ReactNode } from "react";
import type { NetWorthInsight } from "@feature/metrics";

import { NetWorthSkeleton } from "@entity/metrics";


interface NetWorthHeroFxProps {
	isPending: boolean;
	isError: boolean;
	netWorth: NetWorthInsight | undefined;
	children: (netWorth: NetWorthInsight) => ReactNode;
}

const NetWorthHeroFx: FC<NetWorthHeroFxProps> = ({
	isPending,
	isError,
	netWorth,
	children,
}) => {
	if (isPending) {
		return <NetWorthSkeleton />;
	} else if (isError || !netWorth) {
		return <NetWorthHeroFailed />;
	}

	return children(netWorth);
};

const NetWorthHeroFailed: FC = () => (
	<div className="mt-3 text-[13px] text-text-3">
		Couldn’t load net worth.
	</div>
);

export { NetWorthHeroFx };