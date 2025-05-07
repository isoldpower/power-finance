import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { BreadcrumbItem } from './BreadcrumbItem.tsx';
import { useLocation } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import {ReactNode} from "react";


// Mocking the useLocation hook from react-router and the Link component
// to not provide the full routing context
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


describe('BreadcrumbItem Component', () => {
	it('renders BreadcrumbPage when `to` matches current pathname', () => {
		useLocationMock.mockReturnValue({ pathname: '/dashboard' });

		render(
			<BreadcrumbItem to="/dashboard">
				Dashboard
			</BreadcrumbItem>
		);

		const element = screen.getByText('Dashboard');
		expect(element).toBeInTheDocument();

		expect(element.tagName.toLowerCase()).not.toBe('a');
	});

	it('renders BreadcrumbLink when `to` does not match current pathname', () => {
		useLocationMock.mockReturnValue({ pathname: '/settings' });

		render(<BreadcrumbItem to="/dashboard">Dashboard</BreadcrumbItem>);

		const link = screen.getByRole('link', { name: 'Dashboard' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/dashboard');
	});

	it('always renders BreadcrumbSeparator', () => {
		useLocationMock.mockReturnValue({ pathname: '/dashboard' });

		const { container } = render(
			<BreadcrumbItem to="/dashboard">Dashboard</BreadcrumbItem>
		);

		const separator = container.querySelector('hr, span, svg');
		expect(separator).toBeTruthy();
	});
});
