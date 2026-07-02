import type { FC, ReactNode } from "react";

import { AlertIcon } from "../icons/AlertIcon.tsx";

interface NeedsActionHeaderProps {
	countSlot: ReactNode;
}

const NeedsActionHeader: FC<NeedsActionHeaderProps> = ({ countSlot }) => (
	<div className="flex items-center gap-2.5 border-b border-border bg-[var(--accent-soft)] px-[18px] py-3.5">
		<AlertIcon />
		<span className="text-[14.5px] font-semibold">Needs your action</span>
		<span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[11.5px] font-semibold text-white">
			{countSlot}
		</span>
		<div className="flex-1" />
		<span className="hidden font-numeric text-[11px] text-text-3 sm:block">
			approvals before money moves
		</span>
	</div>
);

NeedsActionHeader.displayName = 'NeedsActionHeader';

export { NeedsActionHeader };
export type { NeedsActionHeaderProps };
