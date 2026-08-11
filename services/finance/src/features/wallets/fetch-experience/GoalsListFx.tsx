import { GoalSkeletonRow } from "@entity/wallets";

import { useGoals } from "../data-presenters";

import type { FC, ReactNode } from "react";
import { Caption } from "@shared/pure-components/typography";


const PLACEHOLDER_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'];

interface GoalsListFxProps {
	children: ReactNode;
}

const GoalsListFx: FC<GoalsListFxProps> = ({ children }) => {
	const { isPending, isError } = useGoals();

	if (isPending) {
		return <GoalsListSkeleton />;
	} else if (isError) {
		return <GoalsListFailed />;
	}

	return children;
};

const GoalsListSkeleton: FC = () => (
	<div>
		{PLACEHOLDER_KEYS.map((key) => (
			<GoalSkeletonRow key={key} />
		))}
	</div>
);

const GoalsListFailed: FC = () => (
	<Caption size="13" className="px-[18px] py-6 text-center">
		Couldn’t load goals.
	</Caption>
);

GoalsListFx.displayName = 'GoalsListFx';

export { GoalsListFx };
export type { GoalsListFxProps };
