import { createContext, useRef, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StoreApi } from "zustand";
import type { ReactNode } from "react";

import type { GraphType, ConfigurationStore, ConfigurationStoreState } from "./types";


const ConfigurationStoreContext = createContext<StoreApi<ConfigurationStore> | null>(null);

interface ConfigurationStoreProviderProps {
	children: ReactNode;
	initialState?: Partial<ConfigurationStoreState>;
}

function ConfigurationStoreProvider({ 
	children,
	initialState = {}
}: ConfigurationStoreProviderProps) {
	const defaultValues = useRef<ConfigurationStoreState>({
		graphType: initialState.graphType ?? "linear",
	});

	const [store] = useState(() => {
		return create<ConfigurationStore>()(
			persist(
				(set) => ({
					graphType: initialState.graphType ?? defaultValues.current.graphType,
					setGraphType: (graphType: GraphType) => {
						set({ graphType });
					},
				}),
				{
					name: "configuration-store",
					storage: createJSONStorage(() => localStorage),
				}
			)
		);
	});

	return (
		<ConfigurationStoreContext.Provider value={store}>
			{children}
		</ConfigurationStoreContext.Provider>
	);
}


export { ConfigurationStoreContext, ConfigurationStoreProvider };
export type { ConfigurationStoreProviderProps };