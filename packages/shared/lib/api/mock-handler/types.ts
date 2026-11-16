type SpecificResource<T> = T & {
	id: string;
};

interface IStorage<TValue extends SpecificResource<object>> {
	add: (value: TValue) => void;
	remove: (value: TValue) => void;
	list: () => TValue[];
	get: (id: string) => TValue | undefined;
}

export type { IStorage, SpecificResource };
