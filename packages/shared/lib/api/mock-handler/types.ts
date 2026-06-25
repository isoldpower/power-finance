import type { SpecificResource } from "../model";

interface IStorage<TValue extends SpecificResource<object>> {
	add: (value: TValue) => void
	remove: (value: TValue) => void
	list: () => TValue[]
	get: (id: string) => TValue | undefined
}

export type { SpecificResource, IStorage };