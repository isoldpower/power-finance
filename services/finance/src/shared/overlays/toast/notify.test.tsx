import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { ToastHost } from './ToastHost.tsx';
import { notify } from './notify.ts';


describe('notify', () => {
	afterEach(() => {
		notify.dismiss();
		cleanup();
	});

	test('renders a pending toast that the settled toast replaces in place', async () => {
		render(<ToastHost />);

		notify.pending('Creating transaction…', { id: 'mutation:1' });

		await screen.findByText('Creating transaction…');

		notify.success('Transaction created', { id: 'mutation:1' });

		await screen.findByText('Transaction created');

		await waitFor(() => {
			expect(screen.queryByText('Creating transaction…')).toBeNull();
		});
		expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(1);
	});

	test('lets the finance styling win over the shadcn toast defaults', async () => {
		render(<ToastHost />);

		notify.info('Statement is ready', { id: 'query:statement' });

		const title = await screen.findByText('Statement is ready');
		const [root] = document.querySelectorAll<HTMLElement>('[data-slot="toast"]');

		expect(root.className).toContain('bg-card');
		expect(root.className).not.toContain('bg-popover');
		expect(root.className).not.toContain('rounded-2xl');
		expect(root.style.boxShadow).toBe('var(--shadow-lg)');
		expect(title.className).toContain('text-[13.5px]');
		expect(title.className).not.toContain('text-sm');
	});

	test('gives each tone the matching shadcn toast type, so it picks the icon', async () => {
		render(<ToastHost />);

		notify.error('Charge declined', { id: 'mutation:charge' });

		await screen.findByText('Charge declined');
		const [root] = document.querySelectorAll<HTMLElement>('[data-slot="toast"]');

		expect(root.className).toContain('border-l-neg');
		expect(root.querySelector('[data-slot="toast-icon"]')).not.toBeNull();
	});

	test('renders the description of a failed request alongside its title', async () => {
		render(<ToastHost />);

		notify.error("Couldn't delete wallet", {
			id: 'mutation:2',
			description: 'Wallet still holds funds',
		});

		await screen.findByText("Couldn't delete wallet");

		expect(screen.getByText('Wallet still holds funds')).toBeInTheDocument();
	});

	test('keeps two concurrent requests on separate toasts', async () => {
		render(<ToastHost />);

		notify.pending('Loading wallets…', { id: 'query:wallets' });
		notify.pending('Loading transactions…', { id: 'query:transactions' });

		await screen.findByText('Loading wallets…');
		await screen.findByText('Loading transactions…');

		expect(document.querySelectorAll('[data-slot="toast"]')).toHaveLength(2);
	});
});
