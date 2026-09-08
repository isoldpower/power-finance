const DEFAULT_WALLET_COLOR = '#6366F1';

const WALLET_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const GRADIENT_ANGLE = '135deg';
const GRADIENT_SHADE = 'color-mix(in oklab, %COLOR% 78%, black)';

const isWalletColor = (color: string): boolean => WALLET_COLOR_PATTERN.test(color);

const walletGradient = (color: string): string => {
	const base = isWalletColor(color) ? color : DEFAULT_WALLET_COLOR;

	return `linear-gradient(${GRADIENT_ANGLE}, ${base}, ${GRADIENT_SHADE.replace('%COLOR%', base)})`;
};

const NEW_WALLET_GRADIENT = walletGradient(DEFAULT_WALLET_COLOR);

export {
	DEFAULT_WALLET_COLOR,
	isWalletColor,
	NEW_WALLET_GRADIENT,
	walletGradient,
	WALLET_COLOR_PATTERN,
};
