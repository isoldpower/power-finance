import type { FC, ReactNode } from "react";

interface DisclosureTriggerProps {
	onOpen: () => void;
	children: ReactNode;
}

// Wraps an arbitrary child so clicking it opens an overlay, without adding layout (display:
// contents). Shared by the planning panels/dialogs that are triggered by a passed-in element.
const DisclosureTrigger: FC<DisclosureTriggerProps> = ({ onOpen, children }) => (
	<span className="contents" onClick={onOpen}>{children}</span>
);

DisclosureTrigger.displayName = 'DisclosureTrigger';

export { DisclosureTrigger };
export type { DisclosureTriggerProps };
