import { AutomationSkeletonRow } from "@entity/assistance";

import { useAutomations } from "../data-presenters";

import type { FC, ReactNode } from "react";
import { Caption } from "@shared/pure-components/typography";


const PLACEHOLDER_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'];

interface AutomationsListFxProps {
	children: ReactNode;
}

const AutomationsListFx: FC<AutomationsListFxProps> = ({ children }) => {
	const { isPending, isError } = useAutomations();

	if (isPending) {
		return <AutomationsListSkeleton />;
	} else if (isError) {
		return <AutomationsListFailed />;
	}

	return children;
};

const AutomationsListSkeleton: FC = () => (
	<div>
		{PLACEHOLDER_KEYS.map((key) => (
			<AutomationSkeletonRow key={key} />
		))}
	</div>
);

const AutomationsListFailed: FC = () => (
	<Caption size="13" className="px-[18px] py-6 text-center">
		Couldn’t load automations.
	</Caption>
);

AutomationsListFx.displayName = 'AutomationsListFx';

export { AutomationsListFx };
export type { AutomationsListFxProps };
