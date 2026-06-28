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

export { actionVisual };
export type { ActionVisual };
