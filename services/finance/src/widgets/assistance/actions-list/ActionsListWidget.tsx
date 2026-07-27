import type { FC } from "react";

import { NeedsActionRow, actionVisual, actionLabels } from "@entity/assistance";
import { ActionsListFx } from "@feature/assistance/fetch-experience/ActionsListFx.tsx";
import {Action, useResolveAction} from "@feature/assistance";


interface ActionsListWidgetProps {
	actions: Action[];
	isPending: boolean;
	isError: boolean;
}

const ActionsListWidget: FC<ActionsListWidgetProps> = ({
	actions,
	isError,
	isPending,
}) => {
	const resolve = useResolveAction();

	return (
		<ActionsListFx isPending={isPending} isError={isError} actions={actions}>
			{(actions) => (
				<>{actions.map((action) => {
					const visual = actionVisual(action.kind);
					const labels = actionLabels(action.kind);

					return (
						<NeedsActionRow
							key={action.id}
							icon={visual.icon}
							iconClass={visual.className}
							title={action.title}
							subtitle={action.subtitle}
							primaryLabel={labels.primary}
							secondaryLabel={labels.secondary}
							disabled={resolve.isPending}
							onResolve={() => {
								resolve.mutate(action.id);
							}}
						/>
					);
				})}</>
			)}
		</ActionsListFx>
	);
};

ActionsListWidget.displayName = 'ActionsListWidget';

export { ActionsListWidget };
