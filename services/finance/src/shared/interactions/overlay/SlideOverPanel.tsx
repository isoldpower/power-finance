import type { FC, ReactNode } from "react";

import { SlideOver, DisclosureTrigger } from "@shared/components";
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
			<SlideOver open={open} onClose={close} title={title}>
				{children({ close })}
			</SlideOver>
		</>
	);
};

SlideOverPanel.displayName = 'SlideOverPanel';

export { SlideOverPanel };
export type { SlideOverPanelProps };
