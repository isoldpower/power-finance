import { use } from "react";
import { useStore } from "zustand";

import { WalletsSelectionReactContext } from "./context.ts";

import type { WalletsSelectionState } from "./types.ts";


function useWalletsSelection<T>(selector: (state: WalletsSelectionState) => T) {
	const context = use(WalletsSelectionReactContext);

	if (!context) {
		throw new Error('WalletsSelectionReactContext.Provider is missing. useWalletsSelection<T> must be used within the wallets selection');
	}

	return useStore(context, selector);
}

export { useWalletsSelection };
