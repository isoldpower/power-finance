import axios from "axios";
import http from 'axios/lib/adapters/http.js';


// Force axios to use HTTP handler even in when environment is set to 'jsdom'
function mockAxiosHandler() {
	axios.defaults.adapter = http;
	global.XMLHttpRequest = undefined;
}

// Mock local storage for testing
function mockLocalStorage() {
	const localStorageMock = (() => {
		let store: { [key: string]: string } = {};

		return {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => { store[key] = value.toString() }
		};
	})();

	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock,
	});
}

mockAxiosHandler();
mockLocalStorage();
