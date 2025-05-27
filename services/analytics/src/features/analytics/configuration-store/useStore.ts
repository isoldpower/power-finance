import { use } from "react";
import { useStore } from "zustand";

import { ConfigurationStoreContext } from "./provider";
import type { ConfigurationStore } from "./types";


const useConfigurationStore = <T>(selector: (state: ConfigurationStore) => T): T => {
	const store = use(ConfigurationStoreContext);

	if (!store) {
		throw new Error("ConfigurationStoreContext not found");
	}

	return useStore(store, selector);
};

export { useConfigurationStore };