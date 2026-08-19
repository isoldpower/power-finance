const HEX_PREFIX = '#';
const SHORT_HEX_LENGTH = 3;
const HEX_RADIX = 16;

const BYTE_MASK = 255;
const RED_SHIFT = 16;
const GREEN_SHIFT = 8;


function expandShortHex(hex: string): string {
	let expandedHex = '';
	for (const character of hex) {
		expandedHex += `${character}${character}`;
	}

	return expandedHex;
}

function hexToRgba(hex: string, alpha: number): string {
	const hexDigits = hex.replace(HEX_PREFIX, '');
	const normalizedHex = hexDigits.length === SHORT_HEX_LENGTH 
		? expandShortHex(hexDigits) 
		: hexDigits;
	const hexChannels = parseInt(normalizedHex, HEX_RADIX);

	return 'rgba(' +
		`${((hexChannels >> RED_SHIFT) & BYTE_MASK).toString()},` +
		`${((hexChannels >> GREEN_SHIFT) & BYTE_MASK).toString()},` +
		`${(hexChannels & BYTE_MASK).toString()},` +
		`${alpha.toString()})`;
}

export { hexToRgba };
