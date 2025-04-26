import type { IStorage, SpecificResource } from "./types.ts";

class LocalStorageMock<TValue extends SpecificResource> implements IStorage<TValue> {
	private readonly storageKey: string;

	constructor(_storageKey: string) {
		this.storageKey = _storageKey;
	}

	add(value: TValue): void {
		const items = this.list();
		items.push(value);
		localStorage.setItem(this.storageKey, JSON.stringify(items));
	}

	remove(value: TValue): void {
		const items = this.list().filter(item => item.id !== value.id);
		localStorage.setItem(this.storageKey, JSON.stringify(items));
	}

	list(): TValue[] {
		const items = localStorage.getItem(this.storageKey);
		return items ? JSON.parse(items) : [];
	}

	get(id: string): TValue | undefined {
		return this.list().find(item => item.id === id);
	}
}

export { LocalStorageMock };