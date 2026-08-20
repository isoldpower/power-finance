import { GoalSkeletonRow } from "@entity/wallets";
import { Caption } from "@shared/pure-components/typography";
import { useGoals } from "../data-presenters";

import type { FC, ReactNode } from "react";


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
		{['p1', 'p2', 'p3', 'p4', 'p5'].map((key) => (
			<GoalSkeletonRow key={key}>
				<GoalSkeletonRow.Head>
					<GoalSkeletonRow.Icon />
					<GoalSkeletonRow.Body>
						<GoalSkeletonRow.Name />
						<GoalSkeletonRow.Eta />
					</GoalSkeletonRow.Body>
					<GoalSkeletonRow.Amounts />
				</GoalSkeletonRow.Head>
				<GoalSkeletonRow.Progress>
					<GoalSkeletonRow.Bar />
					<GoalSkeletonRow.Percent />
				</GoalSkeletonRow.Progress>
			</GoalSkeletonRow>
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
