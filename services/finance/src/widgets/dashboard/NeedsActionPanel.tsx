import type { FC } from "react";
import { FinanceCard, FinanceButton } from "@internal/ui-library";

import { useActions, useResolveAction } from "@feature/actions";

const ICON_BY_KIND: Record<string, { icon: string; className: string }> = {
	recurring: { icon: '↻', className: 'bg-[var(--accent-soft)] text-primary' },
	duplicate: { icon: '⧉', className: 'bg-[var(--warn-soft)] text-warn' },
	uncategorized: { icon: '?', className: 'bg-[var(--viol-soft)] text-viol' },
};

const fallbackIcon = { icon: '!', className: 'bg-[var(--accent-soft)] text-primary' };

const NeedsActionPanel: FC = () => {
	const { actions, isPending } = useActions();
	const resolve = useResolveAction();

	return (
		<FinanceCard variant="accent" className="overflow-hidden">
			<div className="flex items-center gap-2.5 border-b border-border bg-[var(--accent-soft)] px-[18px] py-3.5">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 9v4" />
					<path d="M12 17h.01" />
					<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
				</svg>
				<span className="text-[14.5px] font-semibold">Needs your action</span>
				<span className="rounded-full bg-primary px-2.5 py-0.5 text-[11.5px] font-bold text-white">
					{actions.length}
				</span>
				<div className="flex-1" />
				<span className="hidden font-numeric text-[11px] text-text-3 sm:block">approvals before money moves</span>
			</div>

			{isPending ? (
				<div className="px-[18px] py-6 text-center text-[13px] text-text-3">Loading…</div>
			) : actions.length === 0 ? (
				<div className="flex items-center justify-center gap-2.5 px-[18px] py-6 text-sm font-semibold text-pos">
					<span className="flex size-5 items-center justify-center rounded-full bg-pos-soft">✓</span>
					All clear — nothing needs you right now.
				</div>
			) : (
				actions.map((action) => {
					const visual = ICON_BY_KIND[action.kind] ?? fallbackIcon;
					return (
						<div key={action.id} className="flex items-center gap-3.5 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
							<div className={`flex size-[34px] flex-none items-center justify-center rounded-[9px] text-[15px] font-bold ${visual.className}`}>
								{visual.icon}
							</div>
							<div className="min-w-0 flex-1">
								<div className="text-[13.5px] font-semibold">{action.title}</div>
								<div className="mt-px text-xs text-text-2">{action.subtitle}</div>
							</div>
							<FinanceButton variant="outline" size="sm" className="flex-none" disabled={resolve.isPending} onClick={() => { resolve.mutate(action.id); }}>
								{action.secondaryLabel}
							</FinanceButton>
							<FinanceButton size="sm" className="flex-none" disabled={resolve.isPending} onClick={() => { resolve.mutate(action.id); }}>
								{action.primaryLabel}
							</FinanceButton>
						</div>
					);
				})
			)}
		</FinanceCard>
	);
};

NeedsActionPanel.displayName = 'NeedsActionPanel';

export { NeedsActionPanel };
