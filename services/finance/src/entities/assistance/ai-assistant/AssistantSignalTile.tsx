import type { FC } from "react";
import { cn } from "@internal/ui-library";
import type { Tone } from "@shared/utils";

interface AssistantSignal {
	label: string;
	value: string;
	tone: Tone;
}

const toneClass: Record<Tone, string> = {
	pos: 'text-pos',
	neg: 'text-neg',
	neutral: 'text-foreground',
	muted: 'text-text-2',
};

const AssistantSignalTile: FC<AssistantSignal> = ({ label, value, tone }) => (
	<div className="rounded-[var(--radius-md)] border border-border bg-card px-2.5 py-2">
		<div className="text-[10px] text-text-3">{label}</div>
		<div className={cn("font-display text-[15px] font-semibold", toneClass[tone])}>{value}</div>
	</div>
);

AssistantSignalTile.displayName = 'AssistantSignalTile';

export { AssistantSignalTile };
export type { AssistantSignal };
