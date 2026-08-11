import type { FC, ReactNode } from "react";
import type { NetWorthInsight } from "../metrics-api/types.ts";

import { NetWorthSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";


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
	<Caption size="13" className="mt-3">
		Couldn’t load net worth.
	</Caption>
);

export { NetWorthHeroFx };