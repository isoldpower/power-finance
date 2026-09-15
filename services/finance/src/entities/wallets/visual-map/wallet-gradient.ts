const DEFAULT_WALLET_COLOR = '#6366F1';

const WALLET_COLORS: string[] = [
	'#6366F1', '#8B5CF6', '#A855F7', '#EC4899', '#EF4444', '#F97316',
	'#F59E0B', '#84CC16', '#10B981', '#14B8A6', '#06B6D4', '#3B82F6',
];

const WALLET_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const GRADIENT_ANGLE = '135deg';
const GRADIENT_SHADE = 'color-mix(in oklab, %COLOR% 78%, black)';

const isWalletColor = (color: string): boolean => WALLET_COLOR_PATTERN.test(color);

const walletGradient = (color: string): string => {
	const base = isWalletColor(color) ? color : DEFAULT_WALLET_COLOR;

	return `linear-gradient(${GRADIENT_ANGLE}, ${base}, ${GRADIENT_SHADE.replace('%COLOR%', base)})`;
};

export {
	DEFAULT_WALLET_COLOR,
	WALLET_COLORS,
	isWalletColor,
	walletGradient,
	WALLET_COLOR_PATTERN,
};
