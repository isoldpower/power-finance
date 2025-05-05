import {LocalStorageEvent} from "./use-data.ts";

function localStorageAvailable() {
  try {
    const key = '__purpose_of_this_key_is_to_never_occur_in_real_storage__';

    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);

    return true;
  } catch (error) {
    console.debug('Local storage is not available:', error);

    return false;
  }
}

function parseStorageValue<T>(value: string): T | null {
	try {
		return JSON.parse(value) as T;
	} catch (error) {
		console.error('Error while parsing storage value:', error);
		return null;
	}
}

function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable();

  let value: string = defaultValue;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}

function forceStorageUpdate(key: string) {
	try {
		const event = new LocalStorageEvent(key);
		window.dispatchEvent(event);
	} catch (error) {
		console.error('Error while setting storage:', error);
	}
}

export { parseStorageValue, localStorageAvailable, localStorageGetItem, forceStorageUpdate }
