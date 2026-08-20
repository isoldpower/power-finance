import type { FC, ReactNode } from "react";


interface DisclosureTriggerProps {
	onOpen: () => void;
	children: ReactNode;
}

const DisclosureTrigger: FC<DisclosureTriggerProps> = ({ onOpen, children }) => (
	<span className="contents" onClick={onOpen}>
		{children}
	</span>
);

DisclosureTrigger.displayName = 'DisclosureTrigger';

export { DisclosureTrigger };
export type { DisclosureTriggerProps };
