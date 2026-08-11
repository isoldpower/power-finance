import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Heading } from "@shared/pure-components/typography";

import { DisclosureTrigger } from "../disclosure/DisclosureTrigger.tsx";
import { useDisclosure } from "../disclosure/use-disclosure.ts";

interface SlideOverPanelProps {
	trigger: ReactNode;
	title: ReactNode;
	onClose?: () => void;
	children: (api: { close: () => void }) => ReactNode;
}

// Feature-owned slide-over interaction: owns open/close state, the trigger, and the drawer shell.
// The body is a render-prop given `close` so submit handlers can dismiss the panel.
const SlideOverPanel: FC<SlideOverPanelProps> = ({ trigger, title, onClose, children }) => {
	const { open, onOpen, onClose: closeState } = useDisclosure();

	const close = () => {
		closeState();
		onClose?.();
	};

	return (
		<>
			<DisclosureTrigger onOpen={onOpen}>{trigger}</DisclosureTrigger>
			{open ? createPortal(
				<div className="finance-theme">
					<div onClick={close} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" />
					<div className="fixed inset-y-0 right-0 z-[41] flex w-[440px] max-w-[92vw] flex-col border-l border-border bg-card shadow-[var(--shadow-lg)] animate-in slide-in-from-right duration-200">
						<div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
							<Heading className="flex-1">{title}</Heading>
							<button
								type="button"
								onClick={close}
								aria-label="Close"
								className="text-text-3 transition-colors hover:text-foreground"
							>
								✕
							</button>
						</div>
						{children({ close })}
					</div>
				</div>,
				document.body
			) : null}
		</>
	);
};

SlideOverPanel.displayName = 'SlideOverPanel';

export { SlideOverPanel };
export type { SlideOverPanelProps };
