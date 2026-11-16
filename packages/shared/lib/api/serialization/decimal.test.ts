import { describe, expect, test } from 'vitest';

import {
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
} from './decimal.ts';


describe('addAmounts', () => {
	test('keeps cents a float would lose', () => {
		expect(addAmounts('0.1', '0.2')).toBe('0.3');
	});

	test('aligns operands of different scale', () => {
		expect(addAmounts('10', '0.05')).toBe('10.05');
	});

	test('carries across the decimal point', () => {
		expect(addAmounts('0.99', '0.01')).toBe('1.00');
	});

	test('handles magnitudes beyond a safe integer', () => {
		expect(addAmounts('9007199254740993.01', '0.01')).toBe('9007199254740993.02');
	});
});

describe('subtractAmounts', () => {
	test('produces a negative result', () => {
		expect(subtractAmounts('30.00', '50.00')).toBe('-20.00');
	});

	test('settles a wallet against its datum', () => {
		expect(subtractAmounts('100.00', '100.00')).toBe('0.00');
	});
});

describe('compareAmounts', () => {
	test('orders by value, not by string', () => {
		expect(compareAmounts('9.00', '10.00')).toBe(-1);
	});

	test('treats differing scales as equal values', () => {
		expect(compareAmounts('5', '5.00')).toBe(0);
	});
});

describe('roundAmount', () => {
	test('rounds half up at the currency scale', () => {
		expect(roundAmount('1.005', 2)).toBe('1.01');
	});

	test('pads a JPY amount to no fraction digits', () => {
		expect(roundAmount('10', 0)).toBe('10');
	});

	test('drops fraction digits JPY does not carry', () => {
		expect(roundAmount('10.5', 0)).toBe('11');
	});

	test('pads fewer digits than the scale', () => {
		expect(roundAmount('7.5', 2)).toBe('7.50');
	});

	test('rounds a negative amount away from zero', () => {
		expect(roundAmount('-1.005', 2)).toBe('-1.01');
	});
});

describe('predicates', () => {
	test('reads zero at any scale', () => {
		expect(isZeroAmount('0.00')).toBe(true);
		expect(isZeroAmount('-0.00')).toBe(true);
		expect(isZeroAmount('0.01')).toBe(false);
	});

	test('reads sign', () => {
		expect(isNegativeAmount('-0.01')).toBe(true);
		expect(isNegativeAmount('0.00')).toBe(false);
	});

	test('strips the sign', () => {
		expect(absoluteAmount('-20.00')).toBe('20.00');
		expect(absoluteAmount('20.00')).toBe('20.00');
	});

	test('negates', () => {
		expect(negateAmount('20.00')).toBe('-20.00');
		expect(negateAmount('-20.00')).toBe('20.00');
	});

	test('counts fraction digits', () => {
		expect(scaleOf('10')).toBe(0);
		expect(scaleOf('10.005')).toBe(3);
	});
});

describe('sumAmounts', () => {
	test('totals a list without float drift', () => {
		expect(sumAmounts(['0.1', '0.2', '0.3'])).toBe('0.6');
	});

	test('returns zero for an empty list', () => {
		expect(sumAmounts([])).toBe('0');
	});
});

describe('divideAmount', () => {
	test('converts at the target currency scale', () => {
		expect(divideAmount('100.00', '1.25', 2)).toBe('80.00');
	});

	test('rounds a repeating quotient half up', () => {
		expect(divideAmount('10.00', '3', 2)).toBe('3.33');
	});

	test('keeps the sign', () => {
		expect(divideAmount('-10.00', '4', 2)).toBe('-2.50');
	});

	test('returns zero rather than dividing by zero', () => {
		expect(divideAmount('10.00', '0', 2)).toBe('0');
	});

	test('honours a zero-scale currency', () => {
		expect(divideAmount('100.00', '3', 0)).toBe('33');
	});
});

describe('multiplyAmount', () => {
	test('multiplies without float drift', () => {
		expect(multiplyAmount('1824.03', '2.4', 2)).toBe('4377.67');
	});

	test('rounds the product at the target scale', () => {
		expect(multiplyAmount('0.1', '0.2', 2)).toBe('0.02');
	});
});
