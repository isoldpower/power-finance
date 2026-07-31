import { FinanceButton } from "@internal/ui-library";
import { ActionsListFx, ResolveActionOnClick } from "@feature/assistance";
import {
	ActionKindIcon,
	NeedsActionRow,
	resolveSecondaryLabel,
	resolvePrimaryLabel
} from "@entity/assistance";

import type { FC } from "react";
import type { Action } from "@feature/assistance";


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
	return (
		<ActionsListFx isPending={isPending} isError={isError} actions={actions}>
			{(actions) => actions.map((action) => (
				<NeedsActionRow.Container key={action.id}>
					<NeedsActionRow.Icon iconType={action.kind}>
						<ActionKindIcon kind={action.kind} />
					</NeedsActionRow.Icon>
					<div className="min-w-0 flex-1">
						<NeedsActionRow.Title>
							{action.title}
						</NeedsActionRow.Title>
						<NeedsActionRow.Subtitle>
							{action.subtitle}
						</NeedsActionRow.Subtitle>
					</div>
					<FinanceButton asChild variant="outline" size="sm" className="flex-none">
						<ResolveActionOnClick actionId={action.id}>
							{resolveSecondaryLabel(action.kind)}
						</ResolveActionOnClick>
					</FinanceButton>
					<FinanceButton asChild size="sm" className="flex-none">
						<ResolveActionOnClick actionId={action.id}>
							{resolvePrimaryLabel(action.kind)}
						</ResolveActionOnClick>
					</FinanceButton>
				</NeedsActionRow.Container>
			))}
		</ActionsListFx>
	);
};

ActionsListWidget.displayName = 'ActionsListWidget';

export { ActionsListWidget };
