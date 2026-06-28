import type { FC } from "react";
import { FinanceCard, UiSkeleton, cn } from "@internal/ui-library";

import { useActions, useResolveAction } from "@feature/actions";
import { NeedsActionRow, NeedsActionSkeletonRow, actionVisual } from "@entity/actions";

const SKELETON_ROWS = ['s1', 's2', 's3'];

interface NeedsActionPanelProps {
	className?: string;
}

const NeedsActionPanel: FC<NeedsActionPanelProps> = ({ className }) => {
	const { actions, isPending } = useActions();
	const resolve = useResolveAction();

	if (!isPending && actions.length === 0) return null;

	return (
		<FinanceCard variant="accent" className={cn("overflow-hidden", className)}>
			<div className="flex items-center gap-2.5 border-b border-border bg-[var(--accent-soft)] px-[18px] py-3.5">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 9v4" />
					<path d="M12 17h.01" />
					<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
				</svg>
				<span className="text-[14.5px] font-semibold">Needs your action</span>
				<span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[11.5px] font-semibold text-white">
					{isPending ? <UiSkeleton className="my-0.5 h-3 w-2.5 rounded-sm bg-white/50" /> : actions.length}
				</span>
				<div className="flex-1" />
				<span className="hidden font-numeric text-[11px] text-text-3 sm:block">approvals before money moves</span>
			</div>

			{isPending ? (
				SKELETON_ROWS.map((id) => <NeedsActionSkeletonRow key={id} />)
			) : (
				actions.map((action) => {
					const visual = actionVisual(action.kind);
					return (
						<NeedsActionRow
							key={action.id}
							icon={visual.icon}
							iconClass={visual.className}
							title={action.title}
							subtitle={action.subtitle}
							primaryLabel={action.primaryLabel}
							secondaryLabel={action.secondaryLabel}
							disabled={resolve.isPending}
							onResolve={() => { resolve.mutate(action.id); }}
						/>
					);
				})
			)}
		</FinanceCard>
	);
};

NeedsActionPanel.displayName = 'NeedsActionPanel';

export { NeedsActionPanel };
