import type { TextProps } from "@visx/text";


const TICK_LABEL_PROPS: Partial<TextProps> = {
	fill: 'var(--text-3)',
	fontSize: 10.5,
	fontFamily: "'JetBrains Mono', ui-monospace, monospace",
};

const AXIS_STROKE = 'var(--border)';

export { AXIS_STROKE, TICK_LABEL_PROPS };
