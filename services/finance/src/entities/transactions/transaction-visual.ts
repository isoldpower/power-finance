import type { Tone } from "@shared/utils";
import type { TransactionDirection } from "./types.ts";

const toneByDirection: Record<TransactionDirection, Tone> = {
	in: 'pos',
	out: 'neg',
};

const directionIconClass: Record<TransactionDirection, string> = {
	in: 'bg-pos-soft text-pos',
	out: 'bg-[var(--accent-soft)] text-primary',
};

const toneTextClass: Record<Tone, string> = {
	pos: 'text-pos',
	neg: 'text-neg',
	neutral: 'text-text-2',
	muted: 'text-text-2',
};

export { directionIconClass, toneByDirection, toneTextClass };
