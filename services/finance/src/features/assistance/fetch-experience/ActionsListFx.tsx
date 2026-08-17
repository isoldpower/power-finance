import {UiSkeleton} from "@internal/ui-library";

import type { FC, ReactNode } from "react";
import type { Action } from "@entity/assistance";
import { Caption } from "@shared/pure-components/typography";


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
		{Array.from({ length: 3 }).map((_, id) => (
			<div
				key={`action-skeleton-${id.toString()}`} 
				className="flex items-center gap-3.5 border-b border-border px-[18px] py-3.5 last:border-b-0"
			>
				<UiSkeleton className="size-[34px] flex-none rounded-[9px]" />
				<div className="min-w-0 flex-1 space-y-1.5">
					<UiSkeleton className="h-3.5 w-1/2" />
					<UiSkeleton className="h-3 w-3/4" />
				</div>
				<UiSkeleton className="h-8 w-16 flex-none rounded-[var(--radius-md)]" />
				<UiSkeleton className="h-8 w-16 flex-none rounded-[var(--radius-md)]" />
			</div>
		))}
	</div>
);

const ActionsListFailed: FC = () => (
	<Caption size="13" className="mt-4">
		Couldn’t load the action queue.
	</Caption>
);

export { ActionsListFx };