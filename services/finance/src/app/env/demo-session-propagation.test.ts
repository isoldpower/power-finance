import { afterEach, describe, expect, test } from 'vitest';
import { captureDemoSession, forgetDemoSession, getDemoSession } from '@internal/shared';


describe('demo session propagation through the shell', () => {
	afterEach(() => {
		forgetDemoSession();
		window.history.replaceState(null, '', '/');
	});

	test('the id survives a shell redirect that drops the query string', () => {
		window.history.replaceState(null, '', '/?demo_session=portfolio-visit-0001');
		captureDemoSession();

		window.history.replaceState(null, '', '/landing');

		expect(getDemoSession()).toBe('portfolio-visit-0001');
	});

	test('a remote that captures after the redirect keeps the id the shell captured', () => {
		window.history.replaceState(null, '', '/?demo_session=portfolio-visit-0001');
		captureDemoSession();
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBe('portfolio-visit-0001');
	});

	test('a reload with no query string restores the id for the same tab', () => {
		window.sessionStorage.setItem('power-finance:demo-session', 'portfolio-visit-0002');
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBe('portfolio-visit-0002');
	});

	test('a visit without any demo session stays a normal signed-in visit', () => {
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBeUndefined();
		expect(getDemoSession()).toBeUndefined();
	});
});
