interface ActionVisual {
	icon: string;
	className: string;
}

const ICON_BY_KIND: Record<string, ActionVisual> = {
	recurring: { icon: '↻', className: 'bg-[var(--accent-soft)] text-primary' },
	duplicate: { icon: '⧉', className: 'bg-[var(--warn-soft)] text-warn' },
	uncategorized: { icon: '?', className: 'bg-[var(--viol-soft)] text-viol' },
};

const fallbackIcon: ActionVisual = { icon: '!', className: 'bg-[var(--accent-soft)] text-primary' };

const actionVisual = (kind: string): ActionVisual => ICON_BY_KIND[kind] ?? fallbackIcon;

interface ActionLabels {
	primary: string;
	secondary: string;
}

const LABELS_BY_KIND: Record<string, ActionLabels> = {
	recurring: { primary: 'Approve', secondary: 'Skip' },
	duplicate: { primary: 'Merge', secondary: 'Keep both' },
	uncategorized: { primary: 'Review', secondary: 'Later' },
};

const fallbackLabels: ActionLabels = { primary: 'Resolve', secondary: 'Dismiss' };

const actionLabels = (kind: string): ActionLabels => LABELS_BY_KIND[kind] ?? fallbackLabels;

export { actionVisual, actionLabels };
export type { ActionVisual, ActionLabels };
