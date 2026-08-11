import type { FC, ReactNode } from "react";

import { ModalShell } from "./ModalShell.tsx";
import { DisclosureTrigger } from "../disclosure/DisclosureTrigger.tsx";
import { useDisclosure } from "../disclosure/use-disclosure.ts";

interface ConfirmModalProps {
	trigger: ReactNode;
	className?: string;
	onClose?: () => void;
	children: (api: { close: () => void }) => ReactNode;
}

// Feature-owned centered-modal interaction: owns open/close state, the trigger, and the modal shell.
const ConfirmModal: FC<ConfirmModalProps> = ({ trigger, className, onClose, children }) => {
	const { open, onOpen, onClose: closeState } = useDisclosure();

	const close = () => {
		closeState();
		onClose?.();
	};

	return (
		<>
			<DisclosureTrigger onOpen={onOpen}>{trigger}</DisclosureTrigger>
			<ModalShell open={open} onClose={close} className={className}>
				{children({ close })}
			</ModalShell>
		</>
	);
};

ConfirmModal.displayName = 'ConfirmModal';

export { ConfirmModal };
export type { ConfirmModalProps };
