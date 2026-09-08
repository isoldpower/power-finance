const DECIMAL_POINT = '.';
const MINUS_SIGN = '-';
const ZERO_AMOUNT = '0';
const DIVISION_GUARD_DIGITS = 1;

interface DecimalParts {
	negative: boolean;
	integer: string;
	fraction: string;
}

function splitAmount(amount: string): DecimalParts {
	const negative = amount.startsWith(MINUS_SIGN);
	const unsigned = negative ? amount.slice(1) : amount;
	const pointIndex = unsigned.indexOf(DECIMAL_POINT);
	const integer = pointIndex === -1 ? unsigned : unsigned.slice(0, pointIndex);
	const fraction = pointIndex === -1 ? '' : unsigned.slice(pointIndex + 1);

	return {
		negative,
		integer: integer === '' ? ZERO_AMOUNT : integer,
		fraction,
	};
}

function scaleOf(amount: string): number {
	return splitAmount(amount).fraction.length;
}

function toMinorUnits(amount: string, scale: number): bigint {
	const { negative, integer, fraction } = splitAmount(amount);
	const alignedFraction = fraction.padEnd(scale, ZERO_AMOUNT).slice(0, scale);
	const magnitude = BigInt(`${integer}${alignedFraction}`);

	return negative ? -magnitude : magnitude;
}

function fromMinorUnits(units: bigint, scale: number): string {
	const negative = units < 0n;
	const digits = (negative ? -units : units).toString().padStart(scale + 1, ZERO_AMOUNT);
	const integer = digits.slice(0, digits.length - scale);
	const fraction = scale === 0 ? '' : digits.slice(digits.length - scale);
	const unsigned = fraction === '' ? integer : `${integer}${DECIMAL_POINT}${fraction}`;

	return negative ? `${MINUS_SIGN}${unsigned}` : unsigned;
}

function commonScale(left: string, right: string): number {
	return Math.max(scaleOf(left), scaleOf(right));
}

function addAmounts(left: string, right: string): string {
	const scale = commonScale(left, right);

	return fromMinorUnits(toMinorUnits(left, scale) + toMinorUnits(right, scale), scale);
}

function subtractAmounts(left: string, right: string): string {
	const scale = commonScale(left, right);

	return fromMinorUnits(toMinorUnits(left, scale) - toMinorUnits(right, scale), scale);
}

function negateAmount(amount: string): string {
	const scale = scaleOf(amount);

	return fromMinorUnits(-toMinorUnits(amount, scale), scale);
}

function absoluteAmount(amount: string): string {
	return amount.startsWith(MINUS_SIGN) ? amount.slice(1) : amount;
}

function compareAmounts(left: string, right: string): number {
	const scale = commonScale(left, right);
	const leftUnits = toMinorUnits(left, scale);
	const rightUnits = toMinorUnits(right, scale);

	if (leftUnits === rightUnits) {
		return 0;
	}

	return leftUnits < rightUnits ? -1 : 1;
}

function isZeroAmount(amount: string): boolean {
	return toMinorUnits(amount, scaleOf(amount)) === 0n;
}

function isNegativeAmount(amount: string): boolean {
	return toMinorUnits(amount, scaleOf(amount)) < 0n;
}

function sumAmounts(amounts: string[]): string {
	return amounts.reduce((total, amount) => addAmounts(total, amount), ZERO_AMOUNT);
}

function multiplyAmount(left: string, right: string, decimals: number): string {
	const leftScale = scaleOf(left);
	const rightScale = scaleOf(right);
	const product = toMinorUnits(left, leftScale) * toMinorUnits(right, rightScale);

	return roundAmount(fromMinorUnits(product, leftScale + rightScale), decimals);
}

function divideAmount(dividend: string, divisor: string, decimals: number): string {
	const scale = commonScale(dividend, divisor);
	const divisorUnits = toMinorUnits(divisor, scale);

	if (divisorUnits === 0n) {
		return ZERO_AMOUNT;
	}

	const guardScale = decimals + DIVISION_GUARD_DIGITS;
	const dividendUnits = toMinorUnits(dividend, scale) * 10n ** BigInt(guardScale);

	return roundAmount(fromMinorUnits(dividendUnits / divisorUnits, guardScale), decimals);
}

function roundAmount(amount: string, decimals: number): string {
	const scale = scaleOf(amount);

	if (scale <= decimals) {
		return fromMinorUnits(toMinorUnits(amount, decimals), decimals);
	}

	const units = toMinorUnits(amount, scale);
	const factor = 10n ** BigInt(scale - decimals);
	const negative = units < 0n;
	const magnitude = negative ? -units : units;
	const rounded = (magnitude + factor / 2n) / factor;

	return fromMinorUnits(negative ? -rounded : rounded, decimals);
}

export {
	absoluteAmount,
	addAmounts,
	compareAmounts,
	divideAmount,
	isNegativeAmount,
	isZeroAmount,
	multiplyAmount,
	negateAmount,
	roundAmount,
	scaleOf,
	subtractAmounts,
	sumAmounts,
	ZERO_AMOUNT,
};
