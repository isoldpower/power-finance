import { NeedsActionFailedNotice, NeedsActionSkeletonRow } from "@entity/assistance";

import type { FC, ReactNode } from "react";
import type { Action } from "@entity/assistance";


const PLACEHOLDER_KEYS = ['a1', 'a2', 'a3'];

interface ActionsListFxProps {
	isPending: boolean;
	isError: boolean;
	actions: Action[] | undefined;
	children: (actions: Action[]) => ReactNode;
}

const ActionsListFx: FC<ActionsListFxProps> = ({
	isPending,
	isError,
	actions,
	children,
}) => {
	if (isPending) {
		return <ActionsListSkeleton />;
	} else if (isError || !actions) {
		return <ActionsListFailed />;
	}

	return children(actions);
};

const ActionsListSkeleton: FC = () => (
	<div>
		{PLACEHOLDER_KEYS.map((key) => (
			<NeedsActionSkeletonRow key={key}>
				<NeedsActionSkeletonRow.Icon />
				<NeedsActionSkeletonRow.Body>
					<NeedsActionSkeletonRow.Title />
					<NeedsActionSkeletonRow.Subtitle />
				</NeedsActionSkeletonRow.Body>
				<NeedsActionSkeletonRow.Action />
				<NeedsActionSkeletonRow.Action />
			</NeedsActionSkeletonRow>
		))}
	</div>
);

const ActionsListFailed: FC = () => (
	<NeedsActionFailedNotice>
		Couldn’t load the action queue.
	</NeedsActionFailedNotice>
);

ActionsListSkeleton.displayName = 'ActionsListSkeleton';
ActionsListFailed.displayName = 'ActionsListFailed';
ActionsListFx.displayName = 'ActionsListFx';

export { ActionsListFx };
export type { ActionsListFxProps };
