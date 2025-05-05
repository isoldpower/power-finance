import { describe, expect, test, vi, Mock, beforeAll, afterAll, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrencyRates } from './useCurrencyRates';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { CURRENCY_API_URL } from './config';
import { useSettingsContext } from '@internal/shared';

// Mock the useSettingsContext
const mockedUseSettingsContext = useSettingsContext as unknown as Mock;
vi.mock('@internal/shared', async () => {
	const actual = await vi.importActual<any>('@internal/shared');

	return {
		...actual,
		useSettingsContext: vi.fn()
	};
});

// Mock the fetchCurrencies function
const server = setupServer(
	http.get(CURRENCY_API_URL, ({ request }) => {
		const mockRates = {
			'EUR': 0.85,
			'USD': 1.0,
			'JPY': 110.0,
		};

		const url = new URL(request.url);
		const from = url.searchParams.get('base');

		return HttpResponse.json({
			rates: from === 'USD' ? mockRates : {},
			success: true
		}, { status: 200 });
	})
);

function wrapper({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

describe('useCurrencyRates', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('fetches currency data and converts correctly', async () => {
		mockedUseSettingsContext.mockReturnValue({ mainCurrency: 'USD' });

		const { result } = renderHook(() => useCurrencyRates(), { wrapper });
		await waitFor(() => {
			expect(result.current.status).toBe('success');
		});

		const converted = await result.current.convertCurrencyToMain(
			100,
			'EUR'
		);
		expect(converted).toBeCloseTo(100 / 0.85);
	});

	test('returns 0 if no rate is found', async () => {
		mockedUseSettingsContext.mockReturnValue({ mainCurrency: 'USD' });

		const { result } = renderHook(() => useCurrencyRates(), { wrapper });
		await waitFor(() => {
			expect(result.current.status).toBe('success');
		});

		const converted = await result.current.convertCurrencyToMain(
			100,
			'INVALID'
		);
		expect(converted).toBe(0);
	});
});
