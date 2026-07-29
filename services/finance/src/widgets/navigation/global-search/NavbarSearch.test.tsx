import { describe, test, expect, vi, beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const navigate = vi.fn();

vi.mock('@tanstack/react-router', async () => {
	const actual = await vi.importActual<object>('@tanstack/react-router');
	return { ...actual, useNavigate: () => navigate };
});

vi.mock('@feature/wallets', () => ({
	useWalletsList: () => ({
		wallets: [
			{ id: 'w1', name: 'Travel Card', credit: true, balance: { amount: 10, currency: 'EUR' } },
			{ id: 'w2', name: 'Main Checking', credit: false, balance: { amount: 20, currency: 'USD' } },
		],
	}),
}));

const { NavbarSearch } = await import('./NavbarSearch.tsx');

// Radix dialog and cmdk lean on APIs jsdom does not implement.
beforeAll(() => {
	global.ResizeObserver = class {
		observe() { return undefined; }
		unobserve() { return undefined; }
		disconnect() { return undefined; }
	};
	Element.prototype.hasPointerCapture = () => false;
	Element.prototype.scrollIntoView = () => undefined;
	window.matchMedia = ((query: string) => ({
		matches: true,
		media: query,
		onchange: null,
		addEventListener: () => undefined,
		removeEventListener: () => undefined,
		addListener: () => undefined,
		removeListener: () => undefined,
		dispatchEvent: () => false,
	})) as unknown as typeof window.matchMedia;
});

beforeEach(() => {
	vi.clearAllMocks();
});

const openPalette = () => {
	render(<NavbarSearch />);
	fireEvent.click(screen.getByText('Search…'));
};

describe('NavbarSearch', () => {
	test('keeps the palette closed until asked', () => {
		render(<NavbarSearch />);

		expect(screen.queryByPlaceholderText('Search…')).not.toBeInTheDocument();
	});

	test('opens the palette from the trigger', () => {
		openPalette();

		expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
	});

	test('opens the palette on the meta+k shortcut', () => {
		render(<NavbarSearch />);

		fireEvent.keyDown(window, { key: 'k', metaKey: true });

		expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
	});

	test('lists pages and wallets', () => {
		openPalette();

		expect(screen.getByText('Dashboard')).toBeInTheDocument();
		expect(screen.getByText('Settings')).toBeInTheDocument();
		expect(screen.getByText('Travel Card')).toBeInTheDocument();
	});

	test('filters results as the user types', () => {
		openPalette();

		fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'travel' } });

		expect(screen.getByText('Travel Card')).toBeInTheDocument();
		expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
	});

	test('matches a page on its hint, not just its label', () => {
		openPalette();

		fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'net worth' } });

		expect(screen.getByText('Dashboard')).toBeInTheDocument();
		expect(screen.queryByText('Settings')).not.toBeInTheDocument();
	});

	test('reports an empty search', () => {
		openPalette();

		fireEvent.change(screen.getByPlaceholderText('Search…'), { target: { value: 'zzzz' } });

		expect(screen.getByText('No results found.')).toBeInTheDocument();
	});

	test('navigates and closes on select', () => {
		openPalette();

		fireEvent.click(screen.getByText('Management'));

		const [[call]] = navigate.mock.calls as [{ to: string }][];
		expect(call.to).toContain('management');
		expect(screen.queryByPlaceholderText('Search…')).not.toBeInTheDocument();
	});
});
