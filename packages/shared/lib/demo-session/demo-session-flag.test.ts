import { afterEach, describe, expect, test } from 'vitest';

import { captureDemoSession, forgetDemoSession, isDemoSessionRequested } from './demo-session-flag.ts';


describe('demo session flag', () => {
	afterEach(() => {
		forgetDemoSession();
		window.history.replaceState(null, '', '/');
	});

	test('demo_session=true requests a demo session', () => {
		window.history.replaceState(null, '', '/?demo_session=true');

		expect(captureDemoSession()).toBe(true);
	});

	test('the request survives a redirect that drops the query string', () => {
		window.history.replaceState(null, '', '/?demo_session=true');
		captureDemoSession();
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBe(true);
		expect(isDemoSessionRequested()).toBe(true);
	});

	test('a legacy string value still counts as a request', () => {
		window.history.replaceState(null, '', '/?demo_session=portfolio-visit-0001');

		expect(captureDemoSession()).toBe(true);
	});

	test('demo_session=false clears an earlier request', () => {
		window.history.replaceState(null, '', '/?demo_session=true');
		captureDemoSession();
		window.history.replaceState(null, '', '/?demo_session=false');

		expect(captureDemoSession()).toBe(false);
		expect(isDemoSessionRequested()).toBe(false);
	});

	test('a visit without the flag is a normal visit', () => {
		window.history.replaceState(null, '', '/finance/dashboard');

		expect(captureDemoSession()).toBe(false);
	});
});
