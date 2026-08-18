const HEX_PREFIX = '#';
const SHORT_HEX_LENGTH = 3;
const HEX_RADIX = 16;
const BYTE_MASK = 255;
const RED_SHIFT = 16;
const GREEN_SHIFT = 8;

const expandShortHex = (hex: string): string => {
	let expanded = '';

	for (const character of hex) {
		expanded += character + character;
	}

	return expanded;
};

// Canvas fills need rgba() to carry per-particle opacity, so hex swatches are converted on the fly.
const hexToRgba = (hex: string, alpha: number): string => {
	const digits = hex.replace(HEX_PREFIX, '');
	const normalized = digits.length === SHORT_HEX_LENGTH ? expandShortHex(digits) : digits;
	const channels = parseInt(normalized, HEX_RADIX);

	const red = (channels >> RED_SHIFT) & BYTE_MASK;
	const green = (channels >> GREEN_SHIFT) & BYTE_MASK;
	const blue = channels & BYTE_MASK;

	return `rgba(${red.toString()},${green.toString()},${blue.toString()},${alpha.toString()})`;
};

export { hexToRgba };
