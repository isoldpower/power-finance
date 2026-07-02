import type { FC } from "react";
import { FinanceCard, cn } from "@internal/ui-library";

import { useActions } from "@feature/assistance";
import { NeedsActionHeader } from "@entity/assistance";
import { NeedsActionBadgeFx } from "@feature/assistance/fetch-experience/NeedsActionBadgeFx.tsx";
import { HideOnActionsEmpty } from "@feature/assistance/render-guards/HideOnActionsEmpty.tsx";
import { ActionsListWidget } from "@widget/assistance/actions-list/ActionsListWidget.tsx";


interface NeedsActionPanelProps {
	className?: string;
}

const NeedsActionPanel: FC<NeedsActionPanelProps> = ({ className }) => {
	const { actions, isPending, isError } = useActions();

	return (
		<HideOnActionsEmpty actions={actions} isPending={isPending}>
			<FinanceCard variant="accent" className={cn("overflow-hidden", className)}>
				<NeedsActionHeader
					countSlot={
						<NeedsActionBadgeFx isPending={isPending} isError={isError}>
							{actions.length}
						</NeedsActionBadgeFx>
					}
				/>
				<div className="flex flex-col gap-2">
					<ActionsListWidget actions={actions} isPending={isPending} isError={isError} />
				</div>
			</FinanceCard>
		</HideOnActionsEmpty>
	);
};

NeedsActionPanel.displayName = 'NeedsActionPanel';

export { NeedsActionPanel };
