import { Caption, DisplayText } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { Types } from "@shared/formatting";
import type { AssistantSignal } from "../../types.ts";


type AssistantSignalTileProps = AssistantSignal;

const toneClass: Record<Types, string> = {
	pos: 'text-pos',
	neg: 'text-neg',
	neutral: 'text-foreground',
	muted: 'text-text-2',
};

const AssistantSignalTile: FC<AssistantSignalTileProps> = ({ label, value, tone }) => (
	<div className="rounded-[var(--radius-md)] border border-border bg-card px-2.5 py-2">
		<Caption size="10">{label}</Caption>
		<DisplayText size="15" className={toneClass[tone]}>{value}</DisplayText>
	</div>
);

AssistantSignalTile.displayName = 'AssistantSignalTile';

export { AssistantSignalTile };
export type { AssistantSignalTileProps };
