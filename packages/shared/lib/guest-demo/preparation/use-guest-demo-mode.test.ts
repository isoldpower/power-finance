import { createElement } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { GuestDemoReactContext } from '../session/context.ts';
import { createGuestDemoSessionStore } from '../session/session-store.ts';
import { GuestDemoReadinessMockRESTApiClient } from '../api/index.ts';
import { useGuestDemoMode } from './use-guest-demo-mode.ts';

import type { FC, PropsWithChildren } from 'react';


function renderPhase(demoSession: string | null, arrange: (store: ReturnType<typeof createGuestDemoSessionStore>) => void) {
	const store = createGuestDemoSessionStore({ demoSession, client: { post: vi.fn() } });
	arrange(store);
	const wrapper: FC<PropsWithChildren> = ({ children }) => createElement(
		GuestDemoReactContext,
		{ value: { store, readiness: new GuestDemoReadinessMockRESTApiClient(), isGuestVisit: demoSession !== null } },
		children,
	);

	return renderHook(() => useGuestDemoMode(), { wrapper }).result.current;
}

describe('useGuestDemoMode', () => {
	test('a signed-in visit shows no demo line', () => {
		expect(renderPhase(null, () => undefined)).toBe('inactive');
	});

	test('a demo that waited for the full preparation is plain demo mode', () => {
		expect(renderPhase('visit-1', (store) => {
			store.getState().advancePreparation('ready');
		})).toBe('demo');
	});

	test('an early entry reports indexing until search catches up', () => {
		expect(renderPhase('visit-1', (store) => {
			store.getState().advancePreparation('browsable');
			store.getState().enterEarly();
		})).toBe('indexing');
	});

	test('an early entry suggests reloading once indexing finished', () => {
		expect(renderPhase('visit-1', (store) => {
			store.getState().advancePreparation('browsable');
			store.getState().enterEarly();
			store.getState().advancePreparation('ready');
		})).toBe('indexed');
	});
});
