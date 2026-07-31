import type { FC } from "react";
import { FinanceCard, cn } from "@internal/ui-library";

import { ActionsListWidget } from "@widget/assistance";
import { useActions, NeedsActionBadgeFx, HideOnActionsEmpty } from "@feature/assistance";
import { AlertIcon, NeedsActionHeader } from "@entity/assistance";


const NeedsActionPanel: FC = () => {
	const { actions, isPending, isError } = useActions();

	return (
		<HideOnActionsEmpty actions={actions} isPending={isPending}>
			<FinanceCard variant="accent" className={cn("overflow-hidden")}>
				<NeedsActionHeader.Container>
					<AlertIcon />
					<NeedsActionHeader.Title>
						Needs your action
					</NeedsActionHeader.Title>
					<NeedsActionHeader.Badge>
						<NeedsActionBadgeFx isPending={isPending} isError={isError}>
							{actions.length}
						</NeedsActionBadgeFx>
					</NeedsActionHeader.Badge>
					<div className="flex-1" />
					<NeedsActionHeader.Descriptor>
						approvals before money moves
					</NeedsActionHeader.Descriptor>
				</NeedsActionHeader.Container>
				<div className="flex flex-col">
					<ActionsListWidget 
						actions={actions}
						isPending={isPending}
						isError={isError} 
					/>
				</div>
			</FinanceCard>
		</HideOnActionsEmpty>
	);
};

NeedsActionPanel.displayName = 'NeedsActionPanel';

export { NeedsActionPanel };
