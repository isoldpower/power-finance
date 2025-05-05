import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTanStackPageFx } from './getter';
import { PagePending, PageError } from './PageFx';
import { DefaultPending, DefaultError } from './DefaultFx';


// Using warnSpy to track console.warn calls
let warnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
	warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
	warnSpy.mockRestore();
});

describe('getTanStackPageFx', () => {
	it('returns PagePending and PageError for known type "default-page"', () => {
		const result = getTanStackPageFx('default-page');
		expect(result.pendingComponent).toBe(PagePending);
		expect(result.errorComponent).toBe(PageError);
	});

	it('returns DefaultPending and DefaultError for unknown type', () => {
		const result = getTanStackPageFx('unknown-type' as any);
		expect(result.pendingComponent).toBe(DefaultPending);
		expect(result.errorComponent).toBe(DefaultError);
	});

	it('logs a warning when type is not found in dictionary', () => {
		getTanStackPageFx('other' as any);
		expect(warnSpy).toHaveBeenCalledWith(
			'No component found for type: other. Using default components.'
		);
	});

	it('returns Default components when given an empty string', () => {
		const result = getTanStackPageFx('' as any);
		expect(result.pendingComponent).toBe(DefaultPending);
		expect(result.errorComponent).toBe(DefaultError);
		expect(warnSpy).toHaveBeenCalled();
	});

	it('does not log a warning when type exists', () => {
		getTanStackPageFx('default-page');
		expect(warnSpy).not.toHaveBeenCalled();
	});
});
