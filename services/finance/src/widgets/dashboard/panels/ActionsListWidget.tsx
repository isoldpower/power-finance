import type { FC } from "react";

import { NeedsActionRow, actionVisual } from "@entity/actions";
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
				<>{actions.map((action) => (
					<NeedsActionRow
						key={action.id}
						icon={actionVisual(action.kind).icon}
						iconClass={actionVisual(action.kind).className}
						title={action.title}
						subtitle={action.subtitle}
						primaryLabel={action.primaryLabel}
						secondaryLabel={action.secondaryLabel}
						disabled={resolve.isPending}
						onResolve={() => {
							resolve.mutate(action.id);
						}}
					/>
				))}</>
			)}
		</ActionsListFx>
	);
};

ActionsListWidget.displayName = 'ActionsListWidget';

export { ActionsListWidget };
