import { describe, expect, test } from 'vitest';

import { smoothTrend } from './smooth-trend.ts';


describe('smoothTrend', () => {
	test('returns null when there are too few buckets to show a trend', () => {
		expect(smoothTrend([])).toBeNull();
		expect(smoothTrend([10, 20])).toBeNull();
	});

	test('keeps a flat series flat', () => {
		const smoothed = smoothTrend([50, 50, 50, 50, 50]) ?? [];

		smoothed.forEach((value) => { expect(value).toBeCloseTo(50); });
	});

	test('lifts an empty bucket instead of dropping the trend to zero', () => {
		const smoothed = smoothTrend([100, 100, 0, 100, 100, 100, 100, 100]) ?? [];

		expect(smoothed[2]).toBeGreaterThan(40);
		expect(smoothed[2]).toBeLessThan(100);
	});

	test('preserves the total amount within a few percent', () => {
		const values = [0, 120, 0, 0, 300, 80, 0, 150, 90, 0];
		const smoothed = smoothTrend(values) ?? [];
		const sum = (series: number[]) => series.reduce((total, value) => total + value, 0);

		expect(Math.abs(sum(smoothed) - sum(values)) / sum(values)).toBeLessThan(0.1);
	});

	test('follows a rising series upward', () => {
		const smoothed = smoothTrend([10, 20, 30, 40, 50, 60, 70, 80]) ?? [];

		expect(smoothed.at(-1)).toBeGreaterThan(smoothed[0]);
	});
});
