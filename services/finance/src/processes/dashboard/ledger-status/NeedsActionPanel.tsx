import type { FC } from "react";
import { FinanceCard, cn } from "@internal/ui-library";

import { useActions } from "@feature/assistance";
import {NeedsActionBadgeFx} from "@feature/assistance/fetch-experience/NeedsActionBadgeFx.tsx";
import {HideOnActionsEmpty} from "@feature/assistance/render-guards/HideOnActionsEmpty.tsx";
import {ActionsListWidget} from "@widget/dashboard/panels/ActionsListWidget.tsx";


interface NeedsActionPanelProps {
	className?: string;
}

const NeedsActionPanel: FC<NeedsActionPanelProps> = ({ className }) => {
	const { actions, isPending, isError } = useActions();

	return (
		<HideOnActionsEmpty actions={actions} isPending={true}>
			<FinanceCard variant="accent" className={cn("overflow-hidden", className)}>
				<div
					className="flex items-center gap-2.5 border-b border-border bg-[var(--accent-soft)] px-[18px] py-3.5">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)"
						 strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M12 9v4"/>
						<path d="M12 17h.01"/>
						<path
							d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
					</svg>
					<span className="text-[14.5px] font-semibold">Needs your action</span>
					<span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[11.5px] font-semibold text-white">
						<NeedsActionBadgeFx isPending={isPending} isError={isError}>
							{actions.length}
						</NeedsActionBadgeFx>
					</span>
					<div className="flex-1"/>
					<span className="hidden font-numeric text-[11px] text-text-3 sm:block">
						approvals before money moves
					</span>
				</div>
				<div className="flex flex-col gap-2">
					<ActionsListWidget actions={actions} isPending={true} isError={isError} />
				</div>
			</FinanceCard>
		</HideOnActionsEmpty>
	);
};

NeedsActionPanel.displayName = 'NeedsActionPanel';

export { NeedsActionPanel };
