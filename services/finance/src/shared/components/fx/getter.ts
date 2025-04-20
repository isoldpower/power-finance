import type { FxObject, FxType, FxTypeMap } from "./types.ts";
import { PagePending, PageError } from "./PageFx.tsx";
import { DefaultPending, DefaultError } from "./DefaultFx.tsx";

const componentsDictionary: FxTypeMap = {
	'default-page': {
		pendingComponent: PagePending,
		errorComponent: PageError,
	}
}

export const getTanStackPageFx = (
	type: FxType
): FxObject => {
	if (type in componentsDictionary) {
		return componentsDictionary[type];
	}

	console.warn(`No component found for type: ${type}. Using default components.`);
	return {
		pendingComponent: DefaultPending,
		errorComponent: DefaultError,
	}
}