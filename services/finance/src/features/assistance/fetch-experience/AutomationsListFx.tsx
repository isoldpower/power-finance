import { AutomationSkeletonRow } from "@entity/assistance";

import { useAutomations } from "../data-presenters";

import type { FC, ReactNode } from "react";


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
	<div className="px-[18px] py-6 text-center text-[13px] text-text-3">
		Couldn’t load automations.
	</div>
);

AutomationsListFx.displayName = 'AutomationsListFx';

export { AutomationsListFx };
export type { AutomationsListFxProps };
