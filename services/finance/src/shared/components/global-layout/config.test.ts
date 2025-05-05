import { describe, expect } from "vitest";
import { HEADER_HEIGHT } from "./config.ts";


describe('config validation', () => {
	test('header height is positive number', () => {
		expect(typeof HEADER_HEIGHT).toBe('number');
		expect(HEADER_HEIGHT).toBeGreaterThan(1);
	})
});