import type { Tone } from "@shared/utils";

const toneFromAmount = (amount: number): Tone => {
	return (amount >= 0 ? 'pos' : 'neg');
}

const iconClassFromAmount = (amount: number): string => {
	return amount >= 0 ? 'bg-pos-soft text-pos' : 'bg-[var(--accent-soft)] text-primary';
}

const iconFromAmount = (amount: number): string => {
	return (amount >= 0 ? '↓' : '↑');
}

const toneTextClass: Record<Tone, string> = {
	pos: 'text-pos',
	neg: 'text-neg',
	neutral: 'text-text-2',
	muted: 'text-text-2',
};

export { toneFromAmount, iconClassFromAmount, iconFromAmount, toneTextClass };
