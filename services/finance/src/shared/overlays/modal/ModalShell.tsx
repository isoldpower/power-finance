import { createPortal } from "react-dom";
import { cn } from "@internal/ui-library";
import { ShowOn } from "@shared/visibility";

import type { FC, ReactNode } from "react";


interface ModalShellProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
}

const ModalShell: FC<ModalShellProps> = ({ open, onClose, children, className }) => {
	return (
		<ShowOn condition={open}>
			{createPortal(
				<div className="finance-theme">
					<div 
						onClick={onClose}
						className={cn(
							"fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]",
							"animate-in fade-in duration-150"
						)} 
					/>
					<div
						role="alertdialog"
						aria-modal="true"
						className={cn(
							"fixed left-1/2 top-1/2 z-[41] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-lg)] animate-in fade-in zoom-in-95 duration-150",
							className
						)}
					>
						{children}
					</div>
				</div>,
				document.body
			)}
		</ShowOn>
	);
};

ModalShell.displayName = 'ModalShell';

export { ModalShell };
export type { ModalShellProps };
