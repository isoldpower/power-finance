import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface SlideOverProps {
	open: boolean;
	onClose: () => void;
	title: ReactNode;
	children: ReactNode;
}

// Right-anchored slide-over drawer shell (overlay + panel + titled header with a close button).
// Shared by the management entry panel and the planning new-goal / new-rule panels; callers
// supply the scrollable body + footer as children.
const SlideOver: FC<SlideOverProps> = ({ open, onClose, title, children }) => {
	if (!open) return null;

	return createPortal(
		<div className="finance-theme">
			<div onClick={onClose} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" />
			<div className="fixed inset-y-0 right-0 z-[41] flex w-[440px] max-w-[92vw] flex-col border-l border-border bg-card shadow-[var(--shadow-lg)] animate-in slide-in-from-right duration-200">
				<div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
					<span className="flex-1 font-display text-[17px] font-semibold">{title}</span>
					<button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-text-2 hover:bg-secondary">✕</button>
				</div>
				{children}
			</div>
		</div>,
		document.body
	);
};

SlideOver.displayName = 'SlideOver';

export { SlideOver };
export type { SlideOverProps };
