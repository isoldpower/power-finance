import { afterEach, describe, expect, test } from 'vitest';
import { captureDemoSession, forgetDemoSession, isDemoSessionRequested } from '@internal/shared';


describe('demo session request propagation through the shell', () => {
	afterEach(() => {
		forgetDemoSession();
		window.history.replaceState(null, '', '/');
	});

	test('the request survives a shell redirect that drops the query string', () => {
		window.history.replaceState(null, '', '/?demo_session=true');
		captureDemoSession();

		window.history.replaceState(null, '', '/landing');

		expect(isDemoSessionRequested()).toBe(true);
	});

	test('a remote that captures after the redirect keeps the request the shell captured', () => {
		window.history.replaceState(null, '', '/?demo_session=true');
		captureDemoSession();
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBe(true);
	});

	test('a reload with no query string restores the request for the same tab', () => {
		window.sessionStorage.setItem('power-finance:demo-session-requested', 'true');
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBe(true);
	});

	test('a visit without the flag stays a normal signed-in visit', () => {
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBe(false);
		expect(isDemoSessionRequested()).toBe(false);
	});
});
