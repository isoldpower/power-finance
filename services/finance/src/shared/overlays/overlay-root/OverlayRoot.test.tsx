import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';

import { ModalShell } from '../modal/ModalShell.tsx';
import { OverlayRoot } from './OverlayRoot.tsx';


function createShadowMountPoint(): { shadowRoot: ShadowRoot; mountPoint: HTMLDivElement } {
	const shadowHost = document.createElement('div');
	document.body.appendChild(shadowHost);
	const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
	const mountPoint = document.createElement('div');
	shadowRoot.appendChild(mountPoint);

	return { shadowRoot, mountPoint };
}

describe('OverlayRoot', () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = '';
	});

	test('keeps a modal inside the shadow root the app is mounted in', async () => {
		const { shadowRoot, mountPoint } = createShadowMountPoint();

		render(
			<OverlayRoot>
				<ModalShell open onClose={() => undefined}>
					<span>Embedded modal body</span>
				</ModalShell>
			</OverlayRoot>,
			{ container: mountPoint }
		);

		await waitFor(() => {
			expect(shadowRoot.querySelector('[role="alertdialog"]')).not.toBeNull();
		});
		expect(document.body.querySelector('[role="alertdialog"]')).toBeNull();
		expect(mountPoint.contains(shadowRoot.querySelector('[role="alertdialog"]'))).toBe(true);
	});

	test('renders a modal into the page when the app is mounted standalone', async () => {
		const { getByRole } = render(
			<OverlayRoot>
				<ModalShell open onClose={() => undefined}>
					<span>Standalone modal body</span>
				</ModalShell>
			</OverlayRoot>
		);

		await waitFor(() => {
			expect(getByRole('alertdialog').getRootNode()).toBe(document);
		});
	});

	test('falls back to the page body when no overlay root is provided', () => {
		const { getByRole } = render(
			<ModalShell open onClose={() => undefined}>
				<span>Unscoped modal body</span>
			</ModalShell>
		);

		expect(getByRole('alertdialog').closest('body')).toBe(document.body);
	});
});
