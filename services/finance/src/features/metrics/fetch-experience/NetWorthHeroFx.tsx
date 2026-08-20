import type { FC, ReactNode } from "react";
import type { NetWorth } from "@entity/metrics";

import { NetWorthSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";


interface NetWorthHeroFxProps {
	isPending: boolean;
	isError: boolean;
	netWorth: NetWorth | undefined;
	children: (netWorth: NetWorth) => ReactNode;
}

const NetWorthHeroFx: FC<NetWorthHeroFxProps> = ({
	isPending,
	isError,
	netWorth,
	children,
}) => {
	if (isPending) {
		return (
			<NetWorthSkeleton>
				<NetWorthSkeleton.Amount />
				<NetWorthSkeleton.Descriptor />
				<NetWorthSkeleton.Graph />
			</NetWorthSkeleton>
		);
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