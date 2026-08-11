import { describe, test, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { CurrencyCombobox } from './CurrencyCombobox.tsx';

const CURRENCIES = [
	{ code: 'USD', symbol: '$', name: 'US Dollar' },
	{ code: 'EUR', symbol: '€', name: 'Euro' },
	{ code: 'JPY', symbol: '¥', name: 'Yen' },
];

// Radix positions its popover with APIs jsdom does not implement.
beforeAll(() => {
	global.ResizeObserver = class {
		observe() { return undefined; }
		unobserve() { return undefined; }
		disconnect() { return undefined; }
	};
	Element.prototype.hasPointerCapture = () => false;
	Element.prototype.scrollIntoView = () => undefined;
});

const openCombobox = (value?: string, onSelected: (code: string) => void = vi.fn()) => {
	render(<CurrencyCombobox currencies={CURRENCIES} value={value} onSelected={onSelected} />);
	fireEvent.click(screen.getByRole('combobox'));
};

describe('CurrencyCombobox', () => {
	test('shows the selected currency on the trigger', () => {
		render(<CurrencyCombobox currencies={CURRENCIES} value="EUR" onSelected={vi.fn()} />);

		expect(screen.getByRole('combobox')).toHaveTextContent('EUR · Euro');
	});

	test('shows only the code on the pill variant', () => {
		render(<CurrencyCombobox currencies={CURRENCIES} value="EUR" variant="pill" onSelected={vi.fn()} />);

		expect(screen.getByRole('combobox')).toHaveTextContent('EUR');
		expect(screen.getByRole('combobox')).not.toHaveTextContent('Euro');
	});

	test('lists every currency once opened', () => {
		openCombobox();

		expect(screen.getByText('US Dollar')).toBeInTheDocument();
		expect(screen.getByText('Euro')).toBeInTheDocument();
		expect(screen.getByText('Yen')).toBeInTheDocument();
	});

	test('filters the list by name as the user searches', () => {
		openCombobox();

		fireEvent.change(screen.getByPlaceholderText('Search currency...'), { target: { value: 'dollar' } });

		expect(screen.getByText('US Dollar')).toBeInTheDocument();
		expect(screen.queryByText('Euro')).not.toBeInTheDocument();
	});

	test('filters the list by code as the user searches', () => {
		openCombobox();

		fireEvent.change(screen.getByPlaceholderText('Search currency...'), { target: { value: 'jpy' } });

		expect(screen.getByText('Yen')).toBeInTheDocument();
		expect(screen.queryByText('US Dollar')).not.toBeInTheDocument();
	});

	test('reports an empty search', () => {
		openCombobox();

		fireEvent.change(screen.getByPlaceholderText('Search currency...'), { target: { value: 'zzz' } });

		expect(screen.getByText('No currency found.')).toBeInTheDocument();
	});

	test('anchors the popover to the trigger start by default', () => {
		openCombobox();

		expect(screen.getByPlaceholderText('Search currency...').closest('[data-slot=popover-content]'))
			.toHaveAttribute('data-align', 'start');
	});

	test('pivots the popover alignment', () => {
		render(<CurrencyCombobox currencies={CURRENCIES} pivot="end" onSelected={vi.fn()} />);
		fireEvent.click(screen.getByRole('combobox'));

		expect(screen.getByPlaceholderText('Search currency...').closest('[data-slot=popover-content]'))
			.toHaveAttribute('data-align', 'end');
	});

	test('pivots the popover side', () => {
		render(<CurrencyCombobox currencies={CURRENCIES} pivot="top" onSelected={vi.fn()} />);
		fireEvent.click(screen.getByRole('combobox'));

		expect(screen.getByPlaceholderText('Search currency...').closest('[data-slot=popover-content]'))
			.toHaveAttribute('data-side', 'top');
	});

	test('selects with the uppercase code and closes', () => {
		const onSelected = vi.fn();
		openCombobox('USD', onSelected);

		fireEvent.click(screen.getByText('Euro'));

		expect(onSelected).toHaveBeenCalledWith('EUR');
		expect(screen.queryByPlaceholderText('Search currency...')).not.toBeInTheDocument();
	});
});
