import { GoalSkeletonRow } from "@entity/wallets";

import { useGoals } from "../data-presenters";

import type { FC, ReactNode } from "react";


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
	<div className="px-[18px] py-6 text-center text-[13px] text-text-3">
		Couldn’t load goals.
	</div>
);

GoalsListFx.displayName = 'GoalsListFx';

export { GoalsListFx };
export type { GoalsListFxProps };
