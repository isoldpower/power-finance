const textSizeClasses = {
	'6': 'text-[6px]',
	'6.5': 'text-[6.5px]',
	'8': 'text-[8px]',
	'8.5': 'text-[8.5px]',
	'9': 'text-[9px]',
	'9.5': 'text-[9.5px]',
	'10': 'text-[10px]',
	'10.5': 'text-[10.5px]',
	'11': 'text-[11px]',
	'11.5': 'text-[11.5px]',
	'12': 'text-[12px]',
	'12.5': 'text-[12.5px]',
	'13': 'text-[13px]',
	'13.5': 'text-[13.5px]',
	'14': 'text-[14px]',
	'14.5': 'text-[14.5px]',
	'15': 'text-[15px]',
	'17': 'text-[17px]',
	'19': 'text-[19px]',
	'20': 'text-[20px]',
	'26': 'text-[26px]',
	'42': 'text-[42px]',
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	lg: 'text-lg',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
} as const;

const textFamilyClasses = {
	sans: '',
	display: 'font-display',
	numeric: 'font-numeric',
} as const;

const textWeightClasses = {
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
} as const;

const textToneClasses = {
	default: '',
	strong: 'text-foreground',
	muted: 'text-text-2',
	subtle: 'text-text-3',
	positive: 'text-pos',
	negative: 'text-neg',
	warning: 'text-warn',
	violet: 'text-viol',
	accent: 'text-primary',
	inverted: 'text-white',
} as const;

const textTrackingClasses = {
	tight: 'tracking-[-0.01em]',
	normal: '',
	'0.04em': 'tracking-[0.04em]',
	'0.06em': 'tracking-[0.06em]',
	'0.08em': 'tracking-[0.08em]',
	'0.1em': 'tracking-[0.1em]',
	'0.12em': 'tracking-[0.12em]',
	'0.14em': 'tracking-[0.14em]',
} as const;

const textLeadingClasses = {
	none: 'leading-none',
	tight: 'leading-tight',
	snug: 'leading-snug',
	normal: 'leading-normal',
	relaxed: 'leading-relaxed',
	'0.95': 'leading-[0.95]',
	'1.1': 'leading-[1.1]',
} as const;

type TextSize = keyof typeof textSizeClasses;
type TextFamily = keyof typeof textFamilyClasses;
type TextWeight = keyof typeof textWeightClasses;
type TextTone = keyof typeof textToneClasses;
type TextTracking = keyof typeof textTrackingClasses;
type TextLeading = keyof typeof textLeadingClasses;

export {
	textSizeClasses,
	textFamilyClasses,
	textWeightClasses,
	textToneClasses,
	textTrackingClasses,
	textLeadingClasses,
};
export type { TextSize, TextFamily, TextWeight, TextTone, TextTracking, TextLeading };
