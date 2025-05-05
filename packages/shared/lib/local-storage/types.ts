export interface UseLocalStorageReturn<T> {
	state: T
	canReset: boolean
	resetState: () => void
	setField: (name: keyof T, updateValue: T[keyof T]) => void
	setState: (updateState: Partial<T> | T) => void
}
