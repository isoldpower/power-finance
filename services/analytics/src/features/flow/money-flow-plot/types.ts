type SankeyHover = { kind: 'node'; id: string } | { kind: 'link'; key: string } | null;

type LinkEmphasis = 'normal' | 'active' | 'dimmed';

type LabelSide = 'left' | 'right';

interface TooltipAnchor {
	top: number;
	left: number;
}

export type { LabelSide, LinkEmphasis, SankeyHover, TooltipAnchor };
