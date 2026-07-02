import { render, screen } from '@testing-library/react';
import {describe, it, expect, vi, Mock} from 'vitest';
import { RelativeBreadcrumbs } from './RelativeBreadcrumbs';
import { useLocation } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import type { ReactNode } from "react";


// Mocking the useLocation hook from react-router
const useLocationMock = useLocation as unknown as Mock;
vi.mock('@tanstack/react-router', async () => {
	const actual = await vi.importActual<typeof import('@tanstack/react-router')>('@tanstack/react-router');
	return {
		...actual,
		useLocation: vi.fn(),
		Link: ({ to, children }: LinkProps) => (
			<a href={to as string}>
				{children as ReactNode}
			</a>
		)
	};
});

// Minimal mock of BreadcrumbItem to simplify test output
vi.mock('./BreadcrumbItem.tsx', () => ({
	BreadcrumbItem: ({ to, children }: { to: string, children: React.ReactNode }) => (
		<div data-testid="breadcrumb-item" data-to={to}>{children}</div>
	),
}));


describe('<RelativeBreadcrumbs />', () => {
	it('renders Home and one breadcrumb for each pathname chunk', () => {
		useLocationMock.mockReturnValue({ pathname: '/dashboard/projects/alpha' });

		render(<RelativeBreadcrumbs />);

		const items = screen.getAllByTestId('breadcrumb-item');
		expect(items).toHaveLength(4); // Home + 3 chunks

		expect(items[0]).toHaveTextContent('Home');
		expect(items[1]).toHaveTextContent('Dashboard');
		expect(items[2]).toHaveTextContent('Projects');
		expect(items[3]).toHaveTextContent('Alpha');

		expect(items[1]).toHaveAttribute('data-to', '/dashboard');
		expect(items[3]).toHaveAttribute('data-to', '/dashboard/projects/alpha');
	});

	it('applies the root prop to slice the pathname', () => {
		useLocationMock.mockReturnValue({ pathname: '/app/dashboard/settings' });

		render(<RelativeBreadcrumbs root="/app" />);

		const items = screen.getAllByTestId('breadcrumb-item');
		expect(items).toHaveLength(3);

		expect(items[0]).toHaveTextContent('Home');
		expect(items[1]).toHaveTextContent('Dashboard');
		expect(items[2]).toHaveTextContent('Settings');

		expect(items[1]).toHaveAttribute('data-to', '/app/dashboard');
	});

	it('renders only Home when path is equal to root', () => {
		useLocationMock.mockReturnValue({ pathname: '/app' });

		render(<RelativeBreadcrumbs root="/app" />);

		const items = screen.getAllByTestId('breadcrumb-item');
		expect(items).toHaveLength(1);
		expect(items[0]).toHaveTextContent('Home');
		expect(items[0]).toHaveAttribute('data-to', '/app');
	});
});
